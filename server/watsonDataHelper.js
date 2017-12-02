var server = require('./server.js');

module.exports = {

  overallSentimentAnalysis: function(rawData, callback) {
    var sentiments = rawData.document_tone.tones
    console.log('sens', sentiments)
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
            .filter(sentimentObj => {
              return sentimentObj.score >= scoreThreshold
            })
            .map(senti => {
              return senti.tone_name + ': ' + senti.score.toFixed(2);
            })

          delete sentence.tones;
          sentence.allSentiments = setLength(sentence.allSentiments, maxSentiments);
          console.log('one sentence', sentence)

          return sentence;
        });


      return setLength(sentences, sentenceCount);
    }

  var setLength = (array, max) => {
    return array.length > max ? array.slice(0, max) : array
  }
      callback(null, extractSentences(rawData));
  },

}