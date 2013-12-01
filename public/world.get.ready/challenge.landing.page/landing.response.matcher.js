var $ = require('jquery');
var abstractMatcher = require('../../js/abstract.response.matcher');

module.exports = {

	validate: function(request, remoteResponse, content, callback) {
		callback({
			code: 501,
			expected: 'TBD',
			got: 'TBD'
		});
	}
	
};