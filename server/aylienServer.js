var AYLIENTextAPI = require('aylien_textapi');


var textapi = new AYLIENTextAPI({
  application_id: "3df60bff",
  application_key: "deb73f8e34c8cb3a933c133c1e9c27f6"
});


var getAylienData = (text, callback) => {
  console.log('aylien called');
  textapi.sentiment({
    'text': text
  }, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      callback(null, response);
    }
  });
}


module.exports.getAylienData = getAylienData;