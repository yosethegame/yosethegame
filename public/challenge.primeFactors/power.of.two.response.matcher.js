var primeFactorsOf = require('./prime.factors');
var $ = require('jquery');
var abstractMatcher = require('../js/abstract.response.matcher');

module.exports = {

	expectedContent: function(url) {
		var numberIndex = url.indexOf('number=');
		var number = url.substring(numberIndex + 'number='.length);
		return {
			number: parseInt(number),
			decomposition: primeFactorsOf(number)
		};
	},
	
	validate: function(request, remoteResponse, content) {
		return abstractMatcher(request, remoteResponse, content, this);
	}
};


