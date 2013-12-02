var abstractMatcher = require('../../js/abstract.response.matcher');
var cheerio         = require('cheerio');
var PingRequester   = require('../challenge.ping/ping.requester');
var thePlayer       = require('../../js/utils/player.utils');

module.exports = {

    expected: function() {
        pingUrl= new PingRequester(thePlayer.serverOf(this.player)).url();
        
        return "content-type text/html AND a #welcome element AND a a#ping-challenge-link with href='" + pingUrl + "'";
    },
    
    endsWith: function(url, suffix) {
        return url.indexOf(suffix, url.length - suffix.length) !== -1;
    },

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
				expected: this.expected(),
				got: 'Error: Content-Type = ' + this.contentTypeOf(remoteResponse)
			};
		}
		
		var page = cheerio.load(content);
		if (page('#welcome').length === 0) {
            return {
                code: 501,
                expected: this.expected(),
                got: 'Error: missing element #welcome'
            };
        }
        
        if (page('a#ping-challenge-link').length === 0) {
            return {
                code: 501,
                expected: this.expected(),
                got: 'Error: missing element a#ping-challenge-link'
            };
        }
        
        var pingRequester = new PingRequester(thePlayer.serverOf(this.player));  
        if (! this.endsWith(pingRequester.url(), page('a#ping-challenge-link').attr('href'))) {     
            var href = page('a#ping-challenge-link').attr('href');
            return {
                code: 501,
                expected: this.expected(),
                got: 'Error: a#ping-challenge-link attribute href="' + href + '"'
            };
        }
								
        return {
			code: 200,
			expected: this.expected(),
			got: this.expected()
		};
    },

	validate: function(request, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};