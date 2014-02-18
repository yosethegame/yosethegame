var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Restart game:", function() {

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
		database.players = [
			{
				login: 'bilou',
				portfolio: [ { server: 'http://localhost:6000', achievements: [1] } ]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		remote.close();
		server.stop();
	});
	
	describe('When one restarts game,', function() {
		
		it('he sees the first challenge', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou').
				then(function () {
					return browser.clickLink("#restart-game-link");
				}).
				then(function() {
					expect(browser.text("#world-1 ul.level-list li:nth-child(1) a")).toContain(database.worlds[0].levels[0].title);
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
});
		
		
