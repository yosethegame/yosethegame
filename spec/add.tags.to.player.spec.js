var Browser 				= require("zombie");
var router 					= require('../public/js/router');
var Server 					= require('../public/js/server');
var DatabaseWithChallenges 	= require('../test/support/database.with.levels');
var fs 						= require('fs');

describe("Add tags:", function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'annessou'
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When player adds tags in his settings,", function() {
		
		beforeEach(function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou/settings').
				then(function() {
					browser.fill('#tags', 'laval quebec').pressButton('#save-settings-button');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('sees his tags when he comes back to his settings area', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou/settings').
				then(function() {
					expect(browser.query('#tags').value).toEqual('laval quebec');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	
		
});
		
		
