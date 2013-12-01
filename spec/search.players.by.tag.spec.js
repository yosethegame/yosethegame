var Browser 				= require("zombie");
var router 					= require('../public/js/router');
var Server 					= require('../public/js/server');
var DatabaseWithChallenges 	= require('../test/support/database.with.levels');
var fs 						= require('fs');

describe("Search players by tags:", function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'eric',
				tags: 'laval'
			},
			{
				login: 'carl',
				tags: 'st-jean'
			},
			{
				login: 'frank',
				tags: 'st-jean'
			},
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('can find players from st-jean in a list with a line of header', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000').
		    then(function() {
			    return browser.clickLink('a#search-players-link');
		    }).
		    then(function() {
			    return browser.fill('input#criteria', 'st-jean').pressButton('#search-button');
		    }).
			then(function() {
				expect(browser.queryAll('#players tr').length).toEqual(1 + 2);
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	
	
	it('reminds the search value', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/search/carl').
			then(function() {
				expect(browser.query('#criteria').value).toEqual('carl');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
		
});
		
		
