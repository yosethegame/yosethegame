var cheerio         = require('cheerio');
var PingRequester   = require('../../challenge.ping/lib/ping.requester');
var thePlayer       = require('../../../lib/player.utils');
var error501        = require('../../common/lib/501');

require('../../../utils/lib/string.utils');

module.exports = {

    expected: function() {
        pingUrl= new PingRequester(thePlayer.serverOf(this.player)).url();
        return "content-type text/html AND a a#ping-challenge-link with href='" + pingUrl + "'";
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
    
    isNotTheExpected: function(href) {
        var pingRequester = new PingRequester(thePlayer.serverOf(this.player));  
        return ! pingRequester.url().endsWith(href);
    },

    computeStatus: function(remoteResponse, content) {
		if (this.contentTypeOf(remoteResponse).indexOf('text/html') === -1) {
			return error501.withValues(this.expected(), 'Error: Content-Type = ' + this.contentTypeOf(remoteResponse));
		}
		
		var page = cheerio.load(content);
        var linkId = 'a#ping-challenge-link';
        if (page(linkId).length === 0) {
            return error501.withValues(this.expected(), 'Error: missing element ' + linkId);
        }
        
        var href = page(linkId).attr('href');        
        if (this.isNotTheExpected(href)) {
            return error501.withValues(this.expected(), 'Error: ' + linkId + ' attribute href="' + href + '"');
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