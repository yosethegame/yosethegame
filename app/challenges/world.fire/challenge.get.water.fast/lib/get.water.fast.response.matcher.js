var error501            = require('../../../common/lib/501');
var success             = require('../../../common/lib/200');
var equal               = require('deep-equal');
var array               = require('../../../../utils/lib/array.utils');
var Requester           = require('./get.water.fast.requester');
var responseIsJson      = require('../../challenge.common/lib/check.that.response.is.json');
var answerHasMap        = require('../../challenge.common/lib/check.that.answer.has.map');
var extractMap          = require('../../challenge.common/lib/extract.map');
var answerHasMoves      = require('../../challenge.common/lib/check.that.answer.has.moves');

var planePositionIn     = require('../../challenge.first.fire/lib/plane.position.in.map');
var whatIsBelowPlaneIn  = require('../../challenge.first.fire/lib/what.is.below.plane');

var moveUntilWaterOrEnd = function(plane, map, moves) {
    var waterFound = false;     
    array.forEach(moves, function(offset) {
        if (!waterFound) {
            plane.move(offset);
            if (whatIsBelowPlaneIn(map, plane) == 'W') {
                waterFound = true;
            }
        }
    });    
};

module.exports = {
	
	name: 'Get water fast response matcher',

	validate: function(url, remoteResponse, content, callback) {

        if (! responseIsJson(  remoteResponse, content, callback )) { return; }

        var answer = JSON.parse(content);
        if (! answerHasMap( url, answer, callback ) ) { return; }
        if (! answerHasMoves( answer, callback ) ) { return; }

        var sentMap = extractMap(url);
        var target = new Requester().candidateHavingMap(sentMap.join('')).target;
        var plane = planePositionIn(sentMap); 
        var expected = 'Your plane must end over water at ' + JSON.stringify(target) + '. map=' + JSON.stringify(sentMap);
        
        moveUntilWaterOrEnd(plane, sentMap, answer.moves);
        var status;
        if (whatIsBelowPlaneIn(sentMap, plane) == 'W') {
            if (equal(plane, target)) {
                status = success.withValues(expected, 'You did it!');
            } else {
                status = error501.withValues(expected, 'plane reached another water point first. moves=' + JSON.stringify(answer.moves));
            }
        } else {
            status = error501.withValues(expected, 'plane never reached target. moves=' + JSON.stringify(answer.moves));
        }
        
        callback(status);
	}
};