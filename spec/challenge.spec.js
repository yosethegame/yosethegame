var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var DatabaseWithChallenges = require('../test/support/database.with.levels');
var fs = require('fs');

describe("Game experience", function() {

	var server = new Server(router);
	var remote;
	
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
			},
			{
				login: 'bilou',
				server: 'http://localhost:6000',
				portfolio: [ { title: 'challenge 1.1' } ]
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
			browser.visit('http://localhost:5000/players/annessou').
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_1 .challenge")).toEqual('challenge 1.1');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('success');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('a correct expected value');
					done();
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
	});
	
	describe("When player fails the first challenge", function() {
		
		beforeEach(function() {
			database.levels[0].challenges[0].checker = '../../test/support/response.always.501';
		});

		it('displays the detail of the error', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou').
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_1 .challenge")).toEqual('challenge 1.1');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('fail');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('a correct expected value');
					done();
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
		
		it('displays the detail of the success of the first challenge', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/bilou').
				then(function () {
					return browser.pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_1 .challenge")).toEqual('challenge 1.1');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('success');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('a correct expected value');
					done();
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
			browser.visit('http://localhost:5000/players/bilou').
				then(function () {
					return browser.pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#result_2 .challenge")).toEqual('challenge 1.2');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	
});
		
		
