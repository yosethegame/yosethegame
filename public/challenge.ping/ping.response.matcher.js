var $ = require('jquery');

module.exports = {
	expectedContentType: 'application/json',
	
	expectedContent: function(url) {
		return { alive: true };
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
		if (remoteResponse == undefined) return {
			code: 404,
			expected: { 'content-type': 'application/json', body: { alive: true } },
		};
		
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