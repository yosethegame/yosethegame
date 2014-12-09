var matcher = require('./lib/feedback.response.matcher');

describe('Docker response matcher,', function() {
    
    it('does not use always the same ship name', function() {
        var first = matcher.willEnterShip();
        var same = true;
        for (var i=0; i<5; i++) {
            var current = matcher.willEnterShip();
            if (first !== current) {
                same = false;
            }
        }
        expect(same).toEqual(false);
    });
});