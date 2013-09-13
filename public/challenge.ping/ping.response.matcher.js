var $ = require('jquery');
var abstractMatcher = require('../js/abstract.response.matcher');

module.exports = {

	expectedContent: function(url) {
		return { alive: true };
	},
	
	validate: function(request, remoteResponse, content, callback) {
		return abstractMatcher(request, remoteResponse, content, this, callback);
	}
	
};