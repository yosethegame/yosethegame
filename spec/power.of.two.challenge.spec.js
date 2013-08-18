var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');

describe("Power of two challenge", function() {

	var server = new Server(new Router());
	var powerOfTwoChallengePage = "http://localhost:5000/challenge.primeFactors/power.of.two.html";
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("when the remote server is up and responds the expected answer", function() {
		
		var remote;

		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(200, {'Content-Type': 'application/json'});
					response.write(JSON.stringify({ 
							number: 4,
							decomposition: [2, 2]
						}));
					response.end();
				})
			.listen(6000);
		});

		afterEach(function() {
			remote.close();
		});

		it("you pass the level", function(done) {
			var browser = new Browser();
			browser.visit(powerOfTwoChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.query("#success_section").className).toContain('visible');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});		
		
	});
	
	
});
		
		
