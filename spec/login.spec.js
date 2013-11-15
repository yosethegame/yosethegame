var Browser 				= require("zombie");
var router 					= require('../public/js/router');
var Server 					= require('../public/js/server');
var DatabaseWithChallenges 	= require('../test/support/database.with.levels');

describe("Login", function() {

	var server = new Server(router);
	var database;
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it("lands on user's dashbord", function(done) {
		var browser = new Browser();
		browser.visit("http://localhost:5000").
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