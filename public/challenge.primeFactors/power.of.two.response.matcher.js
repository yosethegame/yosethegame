var primeFactorsOf = require('./prime.factors');
var $ = require('jquery');

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
		if (remoteResponse == undefined) {
			return {
				code: 404,
				expected: this.expectedAnswer(request),
			};
		}
		try {
			var parsedContent = $.parseJSON(content);
		}
		catch(e) {
			var parsedContent = content;
		}
		var status = {
			code: this.hasExpectedContentType(remoteResponse) && this.hasExpectedContent(request, content) ? 200 : 501,
			expected : this.expectedAnswer(request),
			got: { 'content-type': remoteResponse.headers['content-type'], body: parsedContent }
		};
		return status;
	}
};


