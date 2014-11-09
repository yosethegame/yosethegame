var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Restart game:", function() {

	var server = new Server(router);
	var database;
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.news = [];
		database.players = [
			{
				login: 'bilou',
				avatar: 'bilou-avatar',
				portfolio: [ { server: 'http://localhost:6000', achievements: [1] } ]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe('When one restarts game,', function() {
		
		beforeEach(function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou').
				then(function () {
					return browser.clickLink("#restart-game-link");
				}).
				then(done);
		});
		
		it('he sees the first challenge', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou').
				then(function() {
					expect(browser.text("#world-1 ul.level-list li:nth-child(1) a")).toContain(database.worlds[0].levels[0].title);
					done();
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('it appears in the news', function(done) {
    		var browser = new Browser();
    		browser.visit('http://localhost:5000/community').
    		    then(function() {
    			    expect(browser.queryAll('#news-1').length).toEqual(1);
    		    }).
    			then(function() {
    				expect(browser.query('#news-1 a').href).toContain('/community');
    				expect(browser.query('#news-1 img').src).toContain('bilou-avatar');
    				expect(browser.text('#news-1')).toContain('restarted the game');
    			}).
    			done(done, function(error) {
    				expect(error.toString()).toBeNull();
    				done();
    			});

    	});
	});
	
});
		
		
