var abstractMatcher = require('../js/abstract.response.matcher');

module.exports = {

	expectedContent: function(url) {
	},
		
	validate: function(request, remoteResponse, content) {		
		return abstractMatcher(request, remoteResponse, content, this);
	}
};


