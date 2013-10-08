var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var DatabaseWithChallenges = require('../test/support/database.with.levels');
var fs = require('fs');

describe("Dasboard,", function() {

	var server = new Server(router);
	var remote;
	
	beforeEach(function() {
		remote = require('http').createServer(
			function (request, response) {
				response.end();
			})
		.listen(6000);			

		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'annessou',
			},
			{
				login: 'bilou',
				server: 'http://localhost:6000',
				portfolio: [ { title: 'challenge 1.1' } ]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		remote.close();
		server.stop();
	});
	
	describe("when player is a new player,", function() {
		
		it('displays the first world as open', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou').
				then(function() {
					expect(browser.text("a#world1")).toEqual('world 1');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	});
		
		
