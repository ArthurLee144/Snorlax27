var server = require('./server.js');

module.exports = {

  overallSentimentAnalysis: function(rawData, callback) {
    console.log('rawData', rawData)
    var sentiments = rawData.document_tone.tone_categories[0].tones
    callback(sentiments);
    },

  sentenceLevelAnalysis: function(rawData, callback) {
    //set max number of sentiments per sentence
    var maxSentiments = 100;
    //set max number of sentences per request
    var sentenceCount = 100;
    //set min score cutoff for each sentiment
    var scoreThreshold = 0;

    var extractSentences = data => {
      var sentences = data.sentences_tone
        .map(sentence => {
          sentence.allSentiments = sentence.tone_categories[0].tones
            .sort((a,b) => {
              return b.score - a.score
            })
            .filter(sentimentObj =>
              sentimentObj.score >= scoreThreshold
            )
          delete sentence.tone_categories;
          sentence.allSentiments = setLength(sentence.allSentiments, maxSentiments);
          return sentence;
        });
      return setLength(sentences, sentenceCount);
    }

  var setLength = (array, max) => {
    return array.length > max ? array.slice(0, max) : array
  }
      callback(extractSentences(rawData))
  },

}