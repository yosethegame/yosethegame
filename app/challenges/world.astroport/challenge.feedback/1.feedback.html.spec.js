var router = require('../../../lib/router');
var Server = require('../../../lib/server');
var request = require('request');

describe('feedback.html', function() {

    var server;
    
	beforeEach(function() {
		server = require('http').createServer(function(request, response) {
            router.endPointOf(request)(request, response);
        }).listen(4000);
	});

	afterEach(function() {
		server.close();
	});
    
    it('references an image that Yose can display', function(done) {
        var html = require('fs').readFileSync('app/challenges/world.astroport/challenge.feedback/lib/feedback.html').toString();
        var document = require('cheerio').load(html);
        var imageUri = document('img#feedback-example').attr('src');

        request('http://localhost:4000/' + imageUri, function (error, response, body) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
});