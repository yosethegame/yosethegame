var urlParser = require('url');
var error501  = require('../../../common/lib/501');
var equal     = require('deep-equal');

module.exports = {

    extractSentMap: function(url) {
	    var mapWidth = urlParser.parse(url, true).query['width'];
	    var regex = new RegExp('.{' + mapWidth + '}', 'g');

	    return urlParser.parse(url, true).query['map'].match(regex);
    },

	validate: function(url, remoteResponse, content, callback) {
	    var sentMap = this.extractSentMap(url);
	    var expected = 'map = ' + JSON.stringify(sentMap);
	    
	    var answer = JSON.parse(content);
	    
	    if (answer == null || answer.map == undefined) {
    		callback(error501.withValues(expected, 'missing field "map"'));	        
	        return;
	    }

	    if (!equal(answer.map, sentMap)) {
    		callback(error501.withValues(expected, 'map = ' + JSON.stringify(answer.map)));
    		return;
	    }
		
		callback({
		    code: 200,
		    expected: expected,
		    got: expected
		});
	}
};