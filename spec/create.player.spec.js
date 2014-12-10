var Browser = require("zombie");
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var InMemoryDatabase = require('../app/support/database.with.levels');

describe('Creating a player', function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [];
		database.news = [];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('makes the dashboard of this player available', function(done) {
		var browser = Browser.create();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric').pressButton('#create');
			}).
			then(function() {
				expect(browser.text('#message')).toEqual('Done');
			}).
			then(function() {
				return browser.visit('http://localhost:5000/players/eric');
			}).
			then(function() {
				expect(browser.text("#world-1 .world-ellipse")).toContain(database.worlds[0].name);
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});

	it('appears in the news', function(done) {
		var browser = Browser.create();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric').fill('#avatar', '/img/me.png').pressButton('#create');
			}).
			then(function() {
        		return browser.visit('http://localhost:5000/community');
			}).
	        then(function() {
		        expect(browser.query('#news-1')).not.toBeNull();
	        }).
		    then(function() {
			    expect(browser.query('#news-1 img').src).toContain('/img/me.png');
			    expect(browser.text('#news-1')).toContain('entered the game');
		    }).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	it('does not create a second news when the player already exists', function(done) {
		var browser = Browser.create();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric').pressButton('#create');
			}).
			then(function () {
				return browser.fill('#login', 'eric').pressButton('#create');
			}).
			then(function() {
        		return browser.visit('http://localhost:5000/community');
			}).
	        then(function() {
		        expect(browser.query('#news-2')).toBeNull();
	        }).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
});