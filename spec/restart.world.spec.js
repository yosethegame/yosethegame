var DatabaseWithChallenges 	= require('../test/support/database.with.levels');
var Browser 				= require("zombie");
var router 					= require('../public/js/router');
var Server 					= require('../public/js/server');

describe("When a player restarts world #2", function() {

	var server = new Server(router);
	var database;
	
	beforeEach(function(done) {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'bilou',
				portfolio: [ { server: 'http://localhost:6000', achievements: [1, 2, 3] } ]
			}
		];
		server.useDatabase(database);
		server.start();

		var browser = new Browser();
		browser.visit('http://localhost:5000/players/bilou').
			then(function () {
				return browser.clickLink("#restart-world-2-link");
			}).
			then(function() {
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});

	afterEach(function() {
		server.stop();
	});

	it('Then the first challenge of world #2 is displayed as an invitation', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/bilou').
			then(function() {
				expect(browser.text("#worlds tr:nth-child(2) td:nth-child(2) ul.levels li:nth-child(1) a")).toContain(database.worlds[1].levels[0].title);
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
});
		
		
