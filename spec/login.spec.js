var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');

describe("Login", function() {

	var server = new Server(new Router());
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it("lands on user's dashbord", function(done) {
		var browser = new Browser();
		browser.visit("http://localhost:5000/login.html").
			then(function () {
				return browser.fill("#login", "ericminio")
					   .pressButton("#enter");
			}).
			then(function() {
				expect(browser.location.toString()).toEqual("http://localhost:5000/players/ericminio");
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
			
});