var server = require('./server.js');

module.exports = {

  // parseReturnFromDB: function(queryObj, callback) {
  //   console.log('============', queryObj);
  //   var scrubbedData = {
  //   }
  //   queryObj.map(el => console.log('!!!!!', JSON.parse(el.watsonData)))
  //   return
  // },

  overallSentimentAnalysis: function(rawData, callback) {
    var data = JSON.parse(rawData);
    var sentiments = data.document_tone.tones
    callback(null, sentiments, rawData);
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
          sentence.allSentiments = sentence.tones
            .sort((a,b) => {
              return b.score - a.score
            })
            .filter(sentimentObj =>
              sentimentObj.score >= scoreThreshold
            )
          delete sentence.tones;
          sentence.allSentiments = setLength(sentence.allSentiments, maxSentiments);
          return sentence;
        });
      return setLength(sentences, sentenceCount);
    }

  var setLength = (array, max) => {
    return array.length > max ? array.slice(0, max) : array
  }
      callback(null, extractSentences(JSON.parse(rawData)));
  },

}