var matcher = require('./lib/persistence.matcher');

describe('Persistence matcher,', function() {

    it('has a number chooser', function() {
        expect(matcher.numberChooser.getNumber()).toBeGreaterThan(1);
    });

});
