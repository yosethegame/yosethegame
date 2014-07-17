var abstractMatcher = require('../../../common/lib/abstract.response.matcher');
var primeFactorsOf = require('../../common/lib/prime.factors');

module.exports = {
	
	name: 'Power of two response matcher',

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


