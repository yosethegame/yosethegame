var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Search players by tags:", function() {

	var server = new Server(router);
    var database;
	
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
			{
                login: 'leo',
                tags: 'España'
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
		browser.visit('http://localhost:5000/community').
		    then(function() {
			    return browser.clickLink('a#search-players-link');
		    }).
		    then(function() {
			    return browser.fill('input#criteria', 'st-jean');
		    }).
		    then(function() {
			    return browser.pressButton('#search-button');
		    }).
			then(function() {
				expect(browser.queryAll('#players tr').length).toEqual(1 + 2);
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	
	
	it('reminds the search value', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/search/carl').
			then(function() {
				expect(browser.query('#criteria').value).toEqual('carl');
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	describe('It works with special characters', function() {

    	it('reminds the search value with special characters', function(done) {
    		var browser = new Browser();
    		browser.visit('http://localhost:5000/players/search/Espa%C3%B1a').
    			then(function() {
    				expect(browser.query('#criteria').value).toEqual('España');
    			}).
    			done(done, function(error) {
    				expect(error.toString()).toBeNull();
    				done();
    			});
    	});

    	it('can find players from criteria with a special character', function(done) {
    		var browser = new Browser();
    		browser.visit('http://localhost:5000/community').
    		    then(function() {
    			    return browser.clickLink('a#search-players-link');
    		    }).
    		    then(function() {
    			    return browser.fill('input#criteria', 'Espa%C3%B1a');
    		    }).
    		    then(function() {
    			    return browser.pressButton('#search-button');
    		    }).
    			then(function() {
    				expect(browser.queryAll('#players tr').length).toEqual(1 + 1);
    			}).
    			done(done, function(error) {
    				expect(error.toString()).toBeNull();
    				done();
    			});
    	});	    
	});
});
		
		
