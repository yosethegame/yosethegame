var Plane = require('./lib/plane');

describe('Plane move', function() {
    
    var plane;
    
    beforeEach(function() {
        plane = new Plane(18, 23);
        plane.move({ dx:1, dy:-1 });
    });
    
    it('moves the plane along x', function() {
        expect(plane.x).toEqual(19);
    });

    it('moves the plane along y', function() {
        expect(plane.y).toEqual(22);
    });

});
