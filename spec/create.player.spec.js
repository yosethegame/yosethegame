var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/InMemoryDatabase');

describe('Creating a player', function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('makes the dashboard of this player available', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/create-new-player').
				then(function () {
					return browser.fill('#login', 'eric')
								  .fill('#avatar', 'this-url')
								  .pressButton('#create');
				}).
				then(function() {
					expect(browser.text('#message')).toEqual('Success');
					done();
				}).
				then(function() {
					browser.visit('http://localhost:5000/players/eric').
					then(function() {
						expect(browser.query("img#avatar").attr('href')).toContain('this-url');
						done();
					}).
					fail(function(error) {
						expect(error.toString()).toBeNull();
						done();
					});
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
	});
	
});