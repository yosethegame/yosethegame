var abstractMatcher = require('../../../common/lib/abstract.response.matcher');

module.exports = {

	name: 'String guard response matcher',

	expectedContent: function(url) {
		var numberIndex = url.indexOf('number=');
		var number = url.substring(numberIndex + 'number='.length);
		return {
			number: number,
			error: 'not a number'
		};
	},
		
	validate: function(request, remoteResponse, content, callback) {		
		return abstractMatcher(request, remoteResponse, content, this, callback);
	}
};


