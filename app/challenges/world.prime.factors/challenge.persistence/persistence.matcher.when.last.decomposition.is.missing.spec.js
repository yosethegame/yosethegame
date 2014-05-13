var matcher = require('./lib/persistence.matcher');

describe('Persistence matcher,', function() {

    describe('When element last decomposition is missing,', function() {

        var remote;

        beforeEach(function() {
            matcher.numberChooser = { getNumber: function() { return 42; } };
            var decomposition = '<html><body></body></html>';
            remote = require('http').createServer(function (request, response) {
                response.write(decomposition);
                response.end();
            }).listen(6000);
        });

        afterEach(function() {
            remote.close();
        });

        it('sets code to 501', function(done) {
            matcher.validate('http://localhost:6000', {}, {}, function(status) {
                expect(status.code).toEqual(200);
                done();
            });
        });

        it('sets expected', function(done) {
            matcher.validate('http://localhost:6000', {}, {}, function(status) {
                expect(status.expected).toEqual("#last-decomposition containing '42 = 2 x 3 x 7'");
                done();
            });
        });

        it('sets actual', function(done) {
            matcher.validate('http://localhost:6000', {}, {}, function(status) {
                expect(status.got).toEqual("#last-decomposition is missing");
                done();
            });
        });

    });

});
