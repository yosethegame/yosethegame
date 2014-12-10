var Browser = require("zombie");
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var DatabaseWithChallenges = require('../app/support/database.with.levels');
var fs = require('fs');

describe("Dashboard,", function() {

	var server = new Server(router);
	var remote;
    var database;
	
	beforeEach(function() {
		remote = require('http').createServer(
			function (request, response) {
				response.end();
			})
		.listen(6000);			

		database = new DatabaseWithChallenges();
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		remote.close();
		server.stop();
	});
	
	describe("when player is a new player,", function() {
		
		beforeEach(function() {
			database.players = [
				{
					login: 'annessou',
				},
			];
		});
		
		it('displays the first world as open', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou').
				then(function() {
					expect(browser.query('#world-1 .world-detail').className).toContain('visible');
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
});
		
		
