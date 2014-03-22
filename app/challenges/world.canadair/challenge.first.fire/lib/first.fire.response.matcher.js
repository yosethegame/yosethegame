var error501            = require('../../../common/lib/501');
var moveCountBeforeBeingAboveWater = require('./move.count').moveCountBeforeBeingAboveWater;
var moveCountBeforeBeingAboveFire = require('./move.count').moveCountBeforeBeingAboveFire;
var responseIsJson      = require('../../challenge.common/lib/check.that.response.is.json');
var answerHasMap        = require('../../challenge.common/lib/check.that.answer.has.map');
var extractMap          = require('../../challenge.common/lib/extract.map');
var answerHasMoves      = require('../../challenge.common/lib/check.that.answer.has.moves');

module.exports = {

    validate: function(url, remoteResponse, content, callback) {

        if (! responseIsJson(  remoteResponse, content, callback )) { return; }

        var answer = JSON.parse(content);
        if (! answerHasMap( url, answer, callback ) ) { return; }
        if (! answerHasMoves( answer, callback ) ) { return; }
        
        var sentMap = extractMap(url);
        var expected = 'Your plane must first take water and then reach the fire. map = ' + JSON.stringify(sentMap);
        
        var moveCountBeforeWater = moveCountBeforeBeingAboveWater(sentMap, answer.moves);
        if (moveCountBeforeWater === -1) {
            callback(error501.withValues(expected, 'Your plane never took water. moves = ' + JSON.stringify(answer.moves)));
            return;
        }		
		var moveCountBeforeFire = moveCountBeforeBeingAboveFire(sentMap, answer.moves);
        if (moveCountBeforeFire === -1) {
            callback(error501.withValues(expected, 'Your plane never reached the fire. moves = ' + JSON.stringify(answer.moves)));
            return;
        }        
        if (moveCountBeforeFire < moveCountBeforeWater) {
            callback(error501.withValues(expected, 'Your plane reached the fire without water. moves = ' + JSON.stringify(answer.moves)));
            return;
        }		
		callback({
            code: 200,
            expected: expected,
            got: 'You did it!'
		});
	}
};