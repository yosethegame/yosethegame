var matcher = require('./lib/docker.response.matcher');

describe('Docker response matcher,', function() {
    
    it('does not use always the same ship name', function() {
        var first = matcher.willEnterShip();
        var different = false;
        for (var i=0; i<5; i++) {
            var current = matcher.willEnterShip();
            different = different || (matcher.willEnterShip() !== first);
        }

        expect(different).toEqual(true);
    });
});