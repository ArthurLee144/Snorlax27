var server = require('./server.js');

module.exports = {

  overallSentimentAnalysis: function(rawData, callback) {
    var sentiments = rawData.document_tone.tone_categories[0].tones
    callback(sentiments);
    },

}