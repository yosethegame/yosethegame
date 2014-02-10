var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');

describe("Login", function() {

	var server;
	var database;
	
	beforeEach(function() {
	    server = new Server(router);
		database = new DatabaseWithChallenges();
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it("lands on user's dashbaord", function(done) {
		var browser = new Browser();
		browser.visit("http://localhost:5000").
			then(function () {
				browser.fill("#login", "ericminio");
                return browser.evaluate("login()");
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