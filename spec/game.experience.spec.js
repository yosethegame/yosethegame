var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Game experience", function() {

	var server = new Server(router);
	var remote;
	var database;
	
	beforeEach(function() {
		remote = require('http').createServer(
			function (request, response) {
				response.end();
			})
		.listen(6000);			

		database = new DatabaseWithChallenges();
		database.players = [
			{
				login: 'annessou',
				avatar: 'asm',
				portfolio: [ { server: 'http://localhost:6000', achievements: [] } ]
			},
			{
				login: 'bilou',
				server: 'http://localhost:6000',
				portfolio: [ { server: 'http://localhost:6000', achievements: [database.worlds[0].levels[0].id ] } ]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		remote.close();
		server.stop();
	});
	
	describe("When player passes the first challenge", function() {
		
		it('displays the detail of the success', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou/play/world/1/level/1').
				then(function () {
					return browser.pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_1 .challenge")).toEqual(database.worlds[0].levels[0].title);
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('success');
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('a correct expected value');
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual('a correct actual value');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('appears in the news', function(done) {
			var browser = new Browser();
    		browser.visit('http://localhost:5000/community').
			    then(function() {
				    expect(browser.queryAll('#news-1').length).toEqual(1);
			    }).
    			then(function() {
    				expect(browser.query('#news-1 a').href).toContain('http://localhost:6000');
    				expect(browser.query('#news-1 img').src).toContain('asm');
    				expect(browser.text('#news-1')).toContain('passed level "' + database.worlds[0].levels[0].title + '"');
    				done();
    			}).
    			fail(function(error) {
    				expect(error.toString()).toBeNull();
    				done();
    			});
		    
		});
	});
	
	describe("When player fails the first challenge", function() {
		
		beforeEach(function() {
			database.worlds[0].levels[0].checker = '../../../support/response.always.501';
		});

		it('displays the detail of the error', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou/play/world/1/level/1').
				then(function () {
					return browser.pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_1 .challenge")).toEqual(database.worlds[0].levels[0].title);
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('fail');
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('a correct expected value');
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual('an incorrect value');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe("When player passes the second challenge", function() {
		
		beforeEach(function() {
		    database.worlds[0].levels[1].isOpenLevelFor = function(player) { return true; }
		});
		
		it('displays the detail of the success of the first challenge', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou/play/world/1/level/2').
				then(function () {
					return browser.pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_1 .challenge")).toEqual(database.worlds[0].levels[0].title);
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('success');
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('a correct expected value');
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual('a correct actual value');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

		it('displays the detail of the success of the second challenge too', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou/play/world/1/level/2').
				then(function () {
					return browser.pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_2 .challenge")).toEqual(database.worlds[0].levels[1].title);
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	
});
		
		
