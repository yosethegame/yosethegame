var $ = require('jquery');
var abstractMatcher = require('../../js/abstract.response.matcher');

module.exports = {

    expected: 'content-type text/html AND non empty #welcome element AND a a#ping-challenge-link with href="ping" element',

    computeStatus: function(remoteResponse, content) {
        self = this;
        return {
			code: 200,
			expected: self.expected,
			got: self.expected
		};
    },

	validate: function(request, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};