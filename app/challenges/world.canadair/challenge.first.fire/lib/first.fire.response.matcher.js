var urlParser           = require('url');
var error501            = require('../../../common/lib/501');
var equal               = require('deep-equal');
var array               = require('../../../../utils/lib/array.utils');
var moveCountBeforeBeingAboveWater = require('./move.count');

module.exports = {

    extractSentMap: function(url) {
        var mapWidth = urlParser.parse(url, true).query.width;
        var regex = new RegExp('.{' + mapWidth + '}', 'g');

        return urlParser.parse(url, true).query.map.match(regex);
    },
    
	validate: function(url, remoteResponse, content, callback) {
        var sentMap = this.extractSentMap(url);
        var expected = 'map = ' + JSON.stringify(sentMap) +
                       ' AND an array field "moves" with elements like {dx: -1/0/1, dy: -1/0/1}';

        var answer = JSON.parse(content);

        if (answer === null || answer.map === undefined) {
            callback(error501.withValues(expected, 'missing field "map"'));
            return;
        }

        if (!equal(answer.map, sentMap)) {
            callback(error501.withValues(expected, 'map = ' + JSON.stringify(answer.map)));
            return;
        }

        if(answer.moves === undefined) {
            callback(error501.withValues(expected, 'missing field "moves"'));
            return;
        }

        if(answer.moves.length === undefined) {
            callback(error501.withValues(expected, 'moves = ' + answer.moves));
            return;
        }

        var stop = false;
        array.forEach(answer.moves, function(move) {
            if (move.dx === undefined || move.dy === undefined) {
                callback(error501.withValues(expected, 'moves = "' + answer.moves + '"'));
                stop = true;
                return;
            }
            if (move.dx*move.dx > 1 || move.dy*move.dy > 1) {
                callback(error501.withValues(expected, 'dx or dy outside of authorized values'));
                stop = true;
                return;
            }
        });
        if (stop) { return; }

        if (moveCountBeforeBeingAboveWater(sentMap, answer.moves) === -1) {
            callback(error501.withValues('your plane must fly over the water', 'your plane never flew over the water'));
            return;
        }
		
		callback({
            code: 200,
            expected: expected,
            got: expected
		});
	}
};