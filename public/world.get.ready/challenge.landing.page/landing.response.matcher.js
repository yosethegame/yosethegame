var cheerio = require('cheerio');
var $ = require('jquery');
var abstractMatcher = require('../../js/abstract.response.matcher');

module.exports = {

    expected: 'content-type text/html AND a #welcome element AND a a#ping-challenge-link with href ending with "ping" element',

    contentTypeOf: function(remoteResponse) {
		if (remoteResponse === undefined ||
			remoteResponse.headers === undefined ||
			remoteResponse.headers['content-type'] === undefined ) {
                return 'text/plain';
            }
		else {
            return remoteResponse.headers['content-type'];
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
		
		var page = cheerio.load(content);
		if (page('#welcome').length === 0) {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: missing element #welcome'
            };
        }
        if (page('a#ping-challenge-link').length === 0) {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: missing element a#ping-challenge-link'
            };
        }
		if (page('a#ping-challenge-link[href$="ping"]').length === 0) {
            var href = page('a#ping-challenge-link').attr('href');
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: a#ping-challenge-link attribute href="' + href + '"'
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