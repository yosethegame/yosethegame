var Browser = require("zombie");
var serving = require('../public/js/serving');
var Server = require('../public/js/server');

describe("decomposition", function() {

	var home = "http://localhost:5000/index.html";

	var server = new Server(serving('public'));
	var browser = new Browser();

	beforeEach(function() {
		server.start();
	});
	
	afterEach(function() {
		server.stop();
	});

	xit("expects something", function(done) {
		browser.visit(home).
			then(function () {
				browser.fill("#number", "42")
					   .clickLink("#decompose");
			}).
			then(function() {
				expect(browser.text("#decomposition")).toEqual("42 = 2 x 3 x 7");
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});		
	
});
		
		
