var session = require('express-session');
var bodyParser = require('body-parser');
var db = require('../database/db.js');
var bcrypt = require('bcrypt');
var path = require('path');
var express = require('express');
var app = express();
var request = require('request');
var $ = require('jquery');
var watson = require('./watsonServer.js');
var AYLIENTextAPI = require('aylien_textapi');
var watsonHelpers = require('./watsonDataHelper');

//These are the api keys and login. They may expire and can be generated for free on Aylien's website :)
var textapi = new AYLIENTextAPI({
  application_id: "3df60bff",
  application_key: "deb73f8e34c8cb3a933c133c1e9c27f6"
});

//Port is dynamic for deployment purposes
var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser());

//the secret string can be changed to anything at all
app.use(session({secret:"snorlax snore", resave:false, saveUninitialized:true}))

//handles logouts
app.post('/logout', function(req, res) {
  // console.log(currentUsername)
  req.session.destroy(function(err) {
    if (err) throw err;
  })
  res.send();
  res.end();
})

//handles new accounts:
app.post('/newAccount', function(req, res) {
  //calls helper function on line 43
  addAccount(req.body.username, req.body.password);
  res.status(200).end();
});

var addAccount = function(user, password) {
  var hash = bcrypt.hashSync(password, 10);
  var newAccount = new db.User({
    username: user,
    password: hash
  });
  newAccount.save(function(error) {
    if (error) throw error;
  });
}

//creates session for logining in and retrieving user specific diaries
var createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    res.send('true');
    res.end()
  })
}


//HANDLE LOGIN
app.post('/login', function(req, res) {
  db.User.findOne({
    username: req.body.username
  }, function(error, user) {
    if (error) {
    }
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        createSession(req, res, user.username);
      } else {
        console.log('Wrong password');
        res.send();
        res.end();
      }
    }
  });
});

//INITIAL POST GET
app.get('/entries', function(req, res) {
  db.Diary.find({username: req.session.user}, function(error, data) {
    if (error) {
      console.log('error line 12 server.js', error);
    } else {
      console.log('success 14 get request');
      data.reverse();
      res.send(data);
      res.end();
    }
  })
});

//HANDLE DIARY POSTS
app.post('/entries', function(req, res) {

  watson.analyzeTone(req.body.text, function(err, watsonData) {
    var watsonProcessed = {
      overallData: [],
      sentences: []
    }
    var rawData = JSON.parse(watsonData);
    if (err) {
      console.log(error)
    }
      watsonHelpers.overallSentimentAnalysis(rawData, function(err, overallData) {
        watsonProcessed.overallData = overallData;
        if (rawData.sentences_tone) {
          watsonHelpers.sentenceLevelAnalysis(rawData, function(err, sentences) {
            watsonProcessed.sentences = sentences;
          })
        }
      });
    console.log('POST REQ SESSION USER', req.session.user);
    addDiaryPost(res, req, req.body.title, req.body.text, watsonProcessed);
  });
});

var addDiaryPost = function(res, req, title, text, watson) {
  textapi.sentiment({
    'text': text
  }, function(error, response) {
    if (error === null) {
      console.log(response);
    }
    var newDiary = new db.Diary({
      title: title,
      text: text,
      sentiment: response,
      username: req.session.user,
      watsonData: watson
    });
    newDiary.save(function(error) {
      if (error) throw error;
      res.status(200).end();
    });
  });

}

//HANDLE TONE ANALYSIS
app.get('/tone', function(req,res) {
  console.log('in server js for watson');
  watson.analyzeTone(req.body);
});



app.listen(port, function() {
  console.log('Yayy Server is listening on ' + port);
});
