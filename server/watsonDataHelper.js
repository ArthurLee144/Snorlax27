var server = require('./server.js');
var watson = require('./watsonServer.js');


var overallSentimentAnalysis = function(rawData, callback) {
    var sentiments = rawData.document_tone.tones
    callback(null, sentiments, rawData);
    };

var sentenceLevelAnalysis = function(rawData, callback) {
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
          return sentence;
        });


      return setLength(sentences, sentenceCount);
    }

  var setLength = (array, max) => {
    return array.length > max ? array.slice(0, max) : array
  }
      callback(null, extractSentences(rawData));
  };

var getAllWatsonData = function(rawData, callback) {
        watson.analyzeTone('hello there. sonny', function(err, watsonData) {
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