var server = require('./server.js');
var watson = require('./watsonServer.js');


var setLength = (array, max) => {
  return array.length > max ? array.slice(0, max) : array
}

var extractSentences = (data, maxSentiments, sentenceCount, scoreThreshold) => {
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
        return sentence;
      });
    return setLength(sentences, sentenceCount);
  }

var sentenceLevelAnalysis = function(rawData, callback) {
    //set max number of sentiments per sentence
    var maxSentiments = 100;
    //set max number of sentences per request
    var sentenceCount = 100;
    //set min score cutoff for each sentiment
    var scoreThreshold = 0;

      callback(null, extractSentences(rawData, maxSentiments, sentenceCount, scoreThreshold));
  };

var overallSentimentAnalysis = function(rawData, callback) {
    var sentiments = rawData.document_tone.tones
    callback(null, sentiments, rawData);
    };

var getAllWatsonData = function(rawData, callback) {
  console.log(rawData);
        watson.analyzeTone(rawData.text, function(err, watsonData) {
    var watsonProcessed = {
      overallData: [],
      sentences: []
    }
    var rawData = JSON.parse(watsonData);
    if (err) {
      console.log(error)
    }
      overallSentimentAnalysis(rawData, function(err, overallData) {
        if (err) {
          console.log(err);
        }
        watsonProcessed.overallData = overallData;
        if (rawData.sentences_tone) {
          sentenceLevelAnalysis(rawData, function(err, sentences) {
            if (err) {
              console.log(err);
            }
            watsonProcessed.sentences = sentences;
          })
        }
      });
    callback(null, watsonProcessed);
    });
  };

module.exports.overallSentimentAnalysis = overallSentimentAnalysis;
module.exports.sentenceLevelAnalysis = sentenceLevelAnalysis;
module.exports.getAllWatsonData = getAllWatsonData;