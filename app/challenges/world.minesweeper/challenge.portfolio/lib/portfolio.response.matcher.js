var cheerio         = require('cheerio');
var thePlayer       = require('../../../../lib/player.utils');
var BoardRequester  = require('../../challenge.board/lib/board.requester');
var error501        = require('../../../common/lib/501');

require('../../../../utils/lib/string.utils');

module.exports = {

    expected: function() {
        formUrl= new BoardRequester(thePlayer.serverOf(this.player)).url();
        return "An element a#minesweeper-link with href='" + formUrl + "' (case sensitive)";
    },
    
    isNotTheExpected: function(href) {
        var boardRequester= new BoardRequester(thePlayer.serverOf(this.player));
        return ! boardRequester.url().endsWith(href);
    },

    computeStatus: function(remoteResponse, content) {        
		var page = cheerio.load(content);

        var linkId = "a#minesweeper-link";
        if (page(linkId).length === 0) {
            return error501.withValues(this.expected(), 'Error: missing element ' + linkId);
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