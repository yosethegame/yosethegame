var planePositionIn     = require('./plane.position.in.map');
var whatIsBelowPlaneIn  = require('./what.is.below.plane');
var array               = require('../../../../utils/lib/array.utils');

moveCountBeforeGivenTarget = function(map, moves, target) {
    var plane = planePositionIn(map);
    var point;
    
    var count = 0;
    var found = false;
    array.forEach(moves, function(offset) {
        if (!found) {
            count ++;
            plane.move(offset);
            point = whatIsBelowPlaneIn(map, plane);
            if (point == target) {
                found = true;
            }
        }
    });
    
    return found === true ? count : -1;
};

moveCountBeforeBeingAboveWater = function(map, moves) {
    return moveCountBeforeGivenTarget(map, moves, 'W');
};

moveCountBeforeBeingAboveFire = function(map, moves) {
    return moveCountBeforeGivenTarget(map, moves, 'F');
};

module.exports.moveCountBeforeBeingAboveWater = moveCountBeforeBeingAboveWater;
module.exports.moveCountBeforeBeingAboveFire = moveCountBeforeBeingAboveFire;

