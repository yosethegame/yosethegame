var moveCountBeforeBeingAboveWater = require('./lib/move.count').moveCountBeforeBeingAboveWater;

describe('moveCountBeforeBeingAboveWater method', function() {
    
    it('returns -1 when the plane never flies over the water', function() {
        expect(moveCountBeforeBeingAboveWater(
            [
                "PW",
                ".F"
            ],
            [
                { dx:0, dy:1 },
                { dx:1, dy:0 },
            ])).toEqual(-1);
    });

    it('returns 1 when the first move puts the plane over the water', function() {
        expect(moveCountBeforeBeingAboveWater(
            [
                "PW",
                ".F"
            ],
            [
                { dx:1, dy:0 },
            ])).toEqual(1);
    });

    it('returns 4 when the fourth move puts the plane over the water', function() {
        expect(moveCountBeforeBeingAboveWater(
            [
                "P.W",
                "..F"
            ],
            [
                { dx:0, dy:1 },
                { dx:1, dy:0 },
                { dx:0, dy:-1 },
                { dx:1, dy:0 },
            ])).toEqual(4);
    });
});
