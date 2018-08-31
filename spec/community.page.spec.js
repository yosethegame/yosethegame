var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');

describe("Community page", function() {

	var server;
	var browser;
	var database;
	
	beforeEach(function() {
		server = new Server(router);
		browser = new Browser();

		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'max',
				score: 10,
				avatar: 'https://si0.twimg.com/profile_images/850192180/Galice_AS_bigger.jpg'
			},
			{
				login: 'zoupo',
				score: 20,
				avatar: 'https://si0.twimg.com/profile_images/2646228289/8e597d3fd146485733ad4f132738898d_bigger.png',
				portfolio: [ { title: 'challenge 1.1' } ]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe('player list', function() {
	
		it('has one line for each player', function(done) {
			
			browser.visit("http://localhost:5000/community").
				then(function() {
					expect(browser.queryAll("#players .player").length).toEqual(2);
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	
	});
	
	it('displays player count', function(done) {
			
		browser.visit("http://localhost:5000/community").
			then(function() {
				expect(browser.text("#player-count")).toEqual('2');
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
		
	it('displays total score', function(done) {
			
		browser.visit("http://localhost:5000/community").
			then(function() {
				expect(browser.text("#score-community")).toEqual('000030');
			}).
			done(done, function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});		
});