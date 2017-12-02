var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;

//Connects to Mlabs mongodb. Will need to make a new one.
mongoose.connect('mongodb://admin:admin@ds125556.mlab.com:25556/heroku_65bb1mgp'); //

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

var DiarySchema = mongoose.Schema({
  title: String,
  text: String,
  sentiment: Object,
  username: String,
  watsonData: Object,
  time: {
    type: Date,
    default: Date.now
  },
  happyCounter: Number
});

var User = mongoose.model('User', UserSchema);
var Diary = mongoose.model('Diary', DiarySchema);

exports.clearDB = function(callback) {
    Diary.remove({}, function(err, data) {
      if (err) {
        console.log(err)
      }
      callback(err, data);
    })

  },
// module.exports.clearDB = clearDB;
module.exports.User = User;
module.exports.Diary = Diary;