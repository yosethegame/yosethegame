var primeFactorsOf = require('./prime.factors');
var $ = require('jquery');
var abstractMatcher = require('../js/abstract.response.matcher');

module.exports = {
	expectedContentType: 'application/json',
	
	expectedContent: function(url) {
		var numberIndex = url.indexOf('number=');
		var number = url.substring(numberIndex + 'number='.length);
		return {
			number: parseInt(number),
			decomposition: primeFactorsOf(number)
		};
	},
	
	expectedAnswer: function(url) {
		return { 
			'content-type': this.expectedContentType, 
			body: this.expectedContent(url) 
		};
	},
	
	hasExpectedContentType: function(response) {
		return response.headers['content-type'] == this.expectedContentType;
	},
	
	hasExpectedContent: function(request, content) {
		return content == JSON.stringify(this.expectedContent(request));
	},
	
	validate: function(request, remoteResponse, content) {
		return abstractMatcher(request, remoteResponse, content, this);
	}
};


