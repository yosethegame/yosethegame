var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Add tags:", function() {

	var server = new Server(router);

	beforeEach(function() {
		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'joe'
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
			browser.visit('http://localhost:5000/players/joe/settings').
				then(function() {
					return browser.fill('#tags', 'laval quebec');
				}).
				then(function() {
					return browser.pressButton('#save-settings-button');
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

		it('sees his tags when he comes back to his settings area', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/joe/settings').
				then(function() {
					expect(browser.query('#tags').value).toEqual('laval quebec');
				}).
				done(done, function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});



});
