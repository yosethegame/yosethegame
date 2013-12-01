var $ = require('jquery');
var abstractMatcher = require('../../js/abstract.response.matcher');

module.exports = {

    expected: 'content-type text/html AND a #welcome element AND a a#ping-challenge-link with href="ping" element',

    contentTypeOf: function(remoteResponse) {
		if (remoteResponse === undefined ||
			remoteResponse.headers === undefined ||
			remoteResponse.headers['content-type'] === undefined ) {
			    return 'text/plain';
		    }
		else {
		    return remoteResponse.headers['content-type']
		}
    },
    
    computeStatus: function(remoteResponse, content) {
		if (this.contentTypeOf(remoteResponse).indexOf('text/html') === -1) {
			return {
				code: 501,
				expected: this.expected,
				got: 'Error: Content-Type = ' + this.contentTypeOf(remoteResponse)
			};
		}
		
        return {
			code: 200,
			expected: this.expected,
			got: this.expected
		};
    },

	validate: function(request, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};