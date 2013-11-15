var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/database.with.levels');

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
							  .fill('#avatar', 'http://this-url');
			}).
			then(function() {
				expect(browser.query('#avatar-preview').src).toEqual('http://this-url/');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
});