var matcher = require('./lib/persistence.matcher');

describe('Persistence matcher,', function() {

    describe('When server displays the wrong last decomposition at second access,', function() {

        var remote;
        var correctContent;

        beforeEach(function() {
            matcher.numberChooser = { getNumber: function() { return 42; } };
            correctContent = '<html><body>' +
                                    '<input id="number" />' +
                                    '<button id="go" />' +
                                    '<label id="last-decomposition">42 = 2 x 3 x 7</label>' +
                                '</body></html>';
            var wrongContent = '<html><body>' +
                                    '<label id="last-decomposition">anything</label>' +
                                '</body></html>';
            var sendContent = correctContent;
            remote = require('http').createServer(function (request, response) {
                    response.write(sendContent);
                    sendContent = wrongContent;
                    response.end();
                }).listen(6000);
        });

        afterEach(function() {
            remote.close();
        });

        it('sets code to 501', function(done) {
            matcher.validate('http://localhost:6000', {}, correctContent, function(status) {
                expect(status.code).toEqual(501);
                done();
            });
        });

        it('sets expected', function(done) {
            matcher.validate('http://localhost:6000', {}, correctContent, function(status) {
                expect(status.expected).toEqual("#last-decomposition containing '42 = 2 x 3 x 7'");
                done();
            });
        });

        it('sets actual', function(done) {
            matcher.validate('http://localhost:6000', {}, correctContent, function(status) {
                expect(status.got).toEqual("#last-decomposition containing 'anything'");
                done();
            });
        });

    });

});
