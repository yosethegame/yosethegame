var array = require('../../../../utils/lib/array.utils');
var Plane = require('./plane');

var planePositionIn = function(map) {
    var x;
    var y = -1;
    var found = false;
    array.forEach(map, function(line) {
        if (!found) {
            y = y + 1;
            var planeIndex = line.indexOf('P');
            if (planeIndex !== -1) {
                x = planeIndex;
                found = true;
            }
        }
    });
    return new Plane(x, y);
};

module.exports = planePositionIn;

