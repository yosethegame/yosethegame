var abstractMatcher = require('../../js/abstract.response.matcher');
var primeFactorsOf = require('../../levels.common/prime.factors');

module.exports = {

	expectedContent: function(url) {
		var numberIndex = url.indexOf('number=');
		var number = url.substring(numberIndex + 'number='.length);
		return {
			number: parseInt(number),
			decomposition: primeFactorsOf(number)
		};
	},
	
	validate: function(request, remoteResponse, content, callback) {
		return abstractMatcher(request, remoteResponse, content, this, callback);
	},
	
	computeStatus: abstractMatcher.computeStatus
};


