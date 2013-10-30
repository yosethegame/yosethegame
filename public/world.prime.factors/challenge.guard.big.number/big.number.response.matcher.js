var abstractMatcher = require('../../js/abstract.response.matcher');

module.exports = {

	expectedContent: function(url) {
		var numberIndex = url.indexOf('number=');
		var number = url.substring(numberIndex + 'number='.length);
		return {
			number: parseInt(number),
			error: 'too big number (>1e6)'
		}
	},
		
	validate: function(request, remoteResponse, content, callback) {		
		return abstractMatcher(request, remoteResponse, content, this, callback);
	}
};


