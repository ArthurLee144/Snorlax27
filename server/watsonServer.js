var watsonAPI = require('watson-developer-cloud/tone-analyzer/v3');


function analyzeTone(textInput, cabllack) {
	var watson = new watsonAPI({
		username: "3d938769-5ffd-42a8-9f4d-ba10ae183b59",
	  password: "sPm4qUZAK6Kr",
	  version_date: '2017-11-30'
	});

	watson.tone({text: textInput},
		function(err, tone) {
			if (err) {
				console.log('watson err', err);
			} else {
				callback(JSON.stringify(tone,null,6));
			}
		}
	);
}

module.exports.analyzeTone = analyzeTone;