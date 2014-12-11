var matcher = require('./lib/persistence.matcher');

describe('Persistence matcher,', function() {

    describe('When element last decomposition is missing,', function() {

        var content;

        beforeEach(function() {
            content = '<html><body></body></html>';
        });

        it('sets code to 501', function(done) {
            matcher.validate('http://localhost:6000', {}, content, function(status) {
                expect(status.code).toEqual(501);
                done();
            });
        });

        it('sets expected', function(done) {
            matcher.validate('http://localhost:6000', {}, content, function(status) {
                expect(status.expected).toEqual("#last-decomposition containing '42 = 2 x 3 x 7'");
                done();
            });
        });

        it('sets actual', function(done) {
            matcher.validate('http://localhost:6000', {}, content, function(status) {
                expect(status.got).toEqual("#last-decomposition is missing");
                done();
            });
        });

    });
});
