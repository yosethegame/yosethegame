var cheerio         = require('cheerio');
var thePlayer       = require('../../js/utils/player.utils');
var FormRequester   = require('../challenge.form/form.requester');
var error501       = require('../../levels.common/501');

require('../../js/utils/string.utils');

module.exports = {

    expected: function() {
        formUrl= new FormRequester(thePlayer.serverOf(this.player)).url();
        return "An element a#prime-factors-decomposition-link with href='" + formUrl + "'";
    },
    
    isNotTheExpected: function(href) {
        var formRequester= new FormRequester(thePlayer.serverOf(this.player));
        return ! formRequester.url().endsWith(href);
    },

    computeStatus: function(remoteResponse, content) {        
		var page = cheerio.load(content);

        var linkId = "a#prime-factors-decomposition-link";
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