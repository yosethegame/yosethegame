var planePositionIn     = require('./plane.position.in.map');
var whatIsBelowPlaneIn  = require('./what.is.below.plane');
var array               = require('../../../../utils/lib/array.utils');

moveCountBeforeBeingAboveWater = function(map, moves) {
    var plane = planePositionIn(map);
    var point;
    
    var count = 0;
    array.forEach(moves, function(offset) {
        count ++;
        plane.move(offset);
        point = whatIsBelowPlaneIn(map, plane);
        if (point == 'W') { return; }
    });
    
    return point == 'W' ? count : -1;
};

module.exports = moveCountBeforeBeingAboveWater;

