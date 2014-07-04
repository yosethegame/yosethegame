var moveCountBeforeBeingAboveWater = require('./lib/move.count').moveCountBeforeBeingAboveWater;

var move = require('../challenge.common/lib/move');

describe('moveCountBeforeBeingAboveWater method', function() {
    
    it('returns -1 when the plane never flies over the water', function() {
        expect(moveCountBeforeBeingAboveWater(
            [
                "PW",
                ".F"
            ],
            [ move.down, move.right,])).toEqual(-1);
    });

    it('returns 1 when the first move puts the plane over the water', function() {
        expect(moveCountBeforeBeingAboveWater(
            [
                "PW",
                ".F"
            ],
            [ move.right])).toEqual(1);
    });

    it('returns 4 when the fourth move puts the plane over the water', function() {
        expect(moveCountBeforeBeingAboveWater(
            [
                "P.W",
                "..F"
            ],
            [ move.down, move.right, move.up, move.right ])).toEqual(4);
    });
});
