var request 		= require('request');
var primeFactorsOf 	= require('./prime.factors.js');

var numberToAskDecompositionFor = function() {
	var index = Math.floor(Math.random()*10);
	return [2, 4, 8, 16, 64, 128, 256, 512, 1024, 2048][index];
};

powerOfTwo = function(incoming, response) {
	var params = require('url').parse(incoming.url, true);
	
	request(params.query.server + '?number=' + powerOfTwo.numberToAskDecompositionFor(), function(error, remoteResponse, content) {
		if (error != null) {
			response.writeHead(404);
			response.end();
			return;
		}
		var expectedAnswer = {
			number: powerOfTwo.numberToAskDecompositionFor(),
			decomposition: primeFactorsOf(powerOfTwo.numberToAskDecompositionFor())
		};
		if (remoteResponse.headers['content-type'] != 'application/json' || content != JSON.stringify(expectedAnswer)) {
			var remoteResponseHeader = remoteResponse.headers['content-type'] ==undefined ? 
					'text/plain':  remoteResponse.headers['content-type'];
			response.writeHead(501);
			response.write(JSON.stringify({
				expected: {
					'content-type' : 'application/json',
					body : expectedAnswer
				},
				got: {
					'content-type' : remoteResponseHeader,
					body : content
				}
			}));
		} else {
			response.write(content);
		}
		response.end();
	});
	
};

setNumberToSendAsNumberToDecompose = function(number) {
	numberToAskForDecomposition = number;
};

module.exports = powerOfTwo;
module.exports.numberToAskDecompositionFor = numberToAskDecompositionFor;
