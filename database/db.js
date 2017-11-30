var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;

//Connects to Mlabs mongodb. Will need to make a new one.
mongoose.connect('mongodb://admin:admin@ds125556.mlab.com:25556/heroku_65bb1mgp'); //

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

var DiarySchema = mongoose.Schema({
  username: String,
  title: String,
  sentiment: Object,
  text: String,
  time: {
    type: Date,
    default: Date.now
  },
  happyCounter: Number
});

var User = mongoose.model('User', UserSchema);
var Diary = mongoose.model('Diary', DiarySchema);

module.exports.User = User;
module.exports.Diary = Diary;