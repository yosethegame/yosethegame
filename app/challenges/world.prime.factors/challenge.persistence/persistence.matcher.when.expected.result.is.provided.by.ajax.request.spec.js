var matcher = require('./lib/persistence.matcher');

describe('Persistence matcher,', function() {

    describe('When the last decomposition is served by an ajax request,', function() {

        var remote;
        var content;

        beforeEach(function() {
            matcher.numberChooser = { getNumber: function() { return 42; } };
            content = '<html><body>' +
                            '<input id="number" />' +
                            '<button id="go" />' +
                            '<label id="last-decomposition"></label>' +
                            '<script>' +
                                'window.onload = function() { ' + 
                                    'var request = new XMLHttpRequest(); ' + 
                                    'request.open("GET", "/last-decomposition");' +
                                    'request.onload = function () {' +
                                        'document.getElementById("last-decomposition").innerHTML = request.responseText;' +
                                    '};' +
                                    'request.send();' +
                                '};'+
                            '</script>' +
                        '</body></html>';
            remote = require('http').createServer(function (request, response) {
                    if (request.url == '/last-decomposition') {
                        response.write('42 = 2 x 3 x 7');
                    }
                    else {
                        response.write(content);
                    }
                    response.end();
                }).listen(6000);
        });

        afterEach(function() {
            remote.close();
        });

        it('sets code to 200', function(done) {
            matcher.validate('http://localhost:6000', {}, content, function(status) {
                expect(status.code).toEqual(200);
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
                expect(status.got).toEqual("#last-decomposition containing '42 = 2 x 3 x 7'");
                done();
            });
        });

    });
});
