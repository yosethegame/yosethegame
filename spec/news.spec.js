var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("News display in Community page:", function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'eric',
				tags: 'laval'
			},
		];
		database.getNews = function(callback) { callback([
		    {
		        date: '26 Feb',
		        image: 'me',
		        url: 'my-url',
		        text: 'my-news'
		    },
		    {
		        date: '1 Jan',
		        image: 'you',
		        url: 'your-url',
		        text: 'your-news'
		    }]) 
		};
		
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('displays the known news', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/community').
			then(function() {
				expect(browser.queryAll('.news').length).toEqual(2);
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	

	it('displays the first news', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/community').
			then(function() {
				expect(browser.text('#news-1')).toContain('Feb 26');
				expect(browser.query('#news-1 a').href).toContain('my-url');
				expect(browser.query('#news-1 img').src).toContain('me');
				expect(browser.text('#news-1')).toContain('my-news');
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	

	it('displays the second news', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/community').
			then(function() {
				expect(browser.text('#news-2')).toContain('Jan 1');
				expect(browser.query('#news-2 a').href).toContain('your-url');
				expect(browser.query('#news-2 img').src).toContain('you');
				expect(browser.text('#news-2')).toContain('your-news');
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	
});
		
		
