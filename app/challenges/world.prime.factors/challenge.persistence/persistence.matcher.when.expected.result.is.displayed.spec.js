var matcher = require('./lib/persistence.matcher');

describe('Persistence matcher,', function() {

    describe('When server displays the expected last decomposition,', function() {

        var remote;
        var decomposition;

        beforeEach(function() {
            matcher.numberChooser = { getNumber: function() { return 42; } };
            decomposition = '<html><body>' +
                                    '<input id="number" />' +
                                    '<button id="go" />' +
                                    '<label id="last-decomposition">42 = 2 x 3 x 7</label>' +
                                '</body></html>';
            remote = require('http').createServer(function (request, response) {
                    response.write(decomposition);
                    response.end();
                }).listen(6000);
        });

        afterEach(function() {
            remote.close();
        });

        it('sets code to 200', function(done) {
            matcher.validate('http://localhost:6000', {}, decomposition, function(status) {
                expect(status.code).toEqual(200);
                done();
            });
        });

        it('sets expected', function(done) {
            matcher.validate('http://localhost:6000', {}, decomposition, function(status) {
                expect(status.expected).toEqual("#last-decomposition containing '42 = 2 x 3 x 7'");
                done();
            });
        });

        it('sets actual', function(done) {
            matcher.validate('http://localhost:6000', {}, decomposition, function(status) {
                expect(status.got).toEqual("#last-decomposition containing '42 = 2 x 3 x 7'");
                done();
            });
        });

    });

});
