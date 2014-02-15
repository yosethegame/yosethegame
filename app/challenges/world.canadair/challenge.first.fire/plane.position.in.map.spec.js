var planePositionIn = require('./lib/plane.position.in.map');
var Plane   = require('./lib/plane');

describe('planePositionIn method', function() {
    
    var map;
    var plane;
    
    beforeEach(function() {
        map = [
            "....",
            "..PW",
            "...F"
        ];    
        plane = planePositionIn(map);
    });
    
    it('returns a plane with the correct x', function() {
        expect(plane.x).toEqual(2);
    });

    it('returns a plane with the correct y', function() {
        expect(plane.y).toEqual(1);
    });

});
