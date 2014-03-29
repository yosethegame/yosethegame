var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Display latest news:", function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'eric',
				tags: 'laval'
			},
		];
		database.news = [
		    {
		        image: 'me',
		        text: 'it happened to me!'
		    },
		    {
		        image: 'you',
		        text: 'it happened to you!'
		    },
		]
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('displays the latest news', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/community').
			then(function() {
				expect(browser.queryAll('.news').length).toEqual(2);
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	
});
		
		
