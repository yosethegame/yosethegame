var whatIsBelowPlaneIn  = require('./lib/what.is.below.plane');
var Plane               = require('./lib/plane');

describe('whatIsBelowPlaneIn method', function() {
    
    var map;
    
    beforeEach(function() {
        map = [
            "....",
            "...W",
            ".F.."
        ];        
    });
    
    it('returns . when the plane is above the land', function() {
        expect(whatIsBelowPlaneIn(map, new Plane(0, 0))).toEqual('.');
    });

    it('returns W when the plane is above the water', function() {
        expect(whatIsBelowPlaneIn(map, new Plane(3, 1))).toEqual('W');
    });

    it('returns F when the plane is above the fire', function() {
        expect(whatIsBelowPlaneIn(map, new Plane(1, 2))).toEqual('F');
    });
    
    describe('when the plane is outside the map', function() {
        
        it('returns undefined when too far right', function() {
            expect(whatIsBelowPlaneIn(map, new Plane(map[0].length, 0))).toEqual( undefined );
        });

        it('returns undefined when too far bottom', function() {
            expect(whatIsBelowPlaneIn(map, new Plane(0, map.length))).toEqual( undefined );
        });

        it('returns undefined when too far left', function() {
            expect(whatIsBelowPlaneIn(map, new Plane(-1, 0))).toEqual( undefined );
        });

        it('returns undefined when too far up', function() {
            expect(whatIsBelowPlaneIn(map, new Plane(0, -1))).toEqual( undefined );
        });

    });
});
