var Browser 				= require("zombie");
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');

describe("When a player restarts world #2", function() {

	var server = new Server(router);
	var database;
	
	beforeEach(function(done) {
		database = new DatabaseWithChallenges();
		database.news = [];
		database.players = [
			{
				login: 'bilou',
				avatar: 'bilou-avatar',
				portfolio: [ { server: 'http://localhost:6000', achievements: [1, 2, 3] } ]
			}
		];
		server.useDatabase(database);
		server.start();

		var browser = new Browser();
		browser.visit('http://localhost:5000/players/bilou').
			then(function () {
				return browser.clickLink("#world-2 .restart-world-link");
			}).
			then(function() {
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});

	afterEach(function() {
		server.stop();
	});

	it('Then the first challenge of world #2 is displayed as an invitation', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/bilou').
			then(function() {
				expect(browser.text("#world-2 ul.level-list li:nth-child(1) a")).toContain(database.worlds[1].levels[0].title);
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	it('Then it appears in the news', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/community').
		    then(function() {
			    expect(browser.queryAll('#news-1').length).toEqual(1);
		    }).
			then(function() {
				expect(browser.query('#news-1 a').href).toContain('http://localhost:6000');
				expect(browser.query('#news-1 img').src).toContain('bilou-avatar');
				expect(browser.text('#news-1')).toContain('restarted world "' + database.worlds[1].name + '"');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	    
	});
	
});
		
		
