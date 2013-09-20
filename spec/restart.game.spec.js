var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/InMemoryDatabase');
var fs = require('fs');

describe("Start over all", function() {

	var server = new Server(router);
	var remote;
	
	beforeEach(function() {
		remote = require('http').createServer(
			function (request, response) {
				response.end();
			})
		.listen(6000);			

		database = new InMemoryDatabase();
		database.players = [
			{
				login: 'bilou',
				server: 'http://localhost:6000',
				portfolio: [ { title: 'Ping' }
				]
			}
		];
		database.levels = [
			{
				number: 1,
				name: 'level 1',
				challenges: [
					{
						title: 'Ping',
						file: 'public/level.1/ping.html',
						requester: '../../test/support/empty.request',
						checker: '../../test/support/response.always.valid',
					}
				]
			},
			{
				number: 2,
				name: 'level 2',
				challenges: [
					{
						title: 'Power of two',
						file: 'public/level.2/power.of.two.html',
						requester: '../../test/support/empty.request',
						checker: '../../test/support/response.always.valid',
					}
				]
			}
			
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		remote.close();
		server.stop();
	});
	
	describe('When one starts over,', function() {
		
		it('he sees the first challenge', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou').
				then(function () {
					return browser.clickLink("#restart-game");
				}).
				then(function() {
					expect(browser.text("#next-challenge-title")).toEqual('Ping');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
});
		
		
