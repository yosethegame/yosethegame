var request = require('request');

var numberToAskForDecomposition;

powerOfTwo = function(incoming, response) {
	response.end();
};

setNumberToSendAsNumberToDecompose = function(number) {
	numberToAskForDecomposition = number;
};

module.exports = powerOfTwo;
module.exports.setNumberToSendAsNumberToDecompose = setNumberToSendAsNumberToDecompose;