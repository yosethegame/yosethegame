var request = require('request');

var numberToAskDecompositionFor = function() {
	var index = Math.floor(Math.random()*10);
	return [2, 4, 8, 16, 64, 128, 256, 512, 1024, 2048][index];
};

powerOfTwo = function(incoming, response) {
	var params = require('url').parse(incoming.url, true);
	
	request(params.query.server + '?number=' + powerOfTwo.numberToAskDecompositionFor(), function(error, remoteResponse, content) {
		if (error != null) {
			response.end();
			return;
		}
		response.write(content);
		response.end();
	});
	
};

setNumberToSendAsNumberToDecompose = function(number) {
	numberToAskForDecomposition = number;
};

module.exports = powerOfTwo;
module.exports.numberToAskDecompositionFor = numberToAskDecompositionFor;
