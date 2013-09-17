var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/InMemoryDatabase');
var fs = require('fs');

describe("Prime factors decomposition level", function() {

	var server = new Server(router);
	var remote;
	
	beforeEach(function() {
		remote = require('http').createServer(
			function (request, response) {
				response.end();
			})
		.listen(6000);			

		database = new InMemoryDatabase();
		database.players = [
			{
				login: 'annessou',
			},
			{
				login: 'bilou',
				server: 'http://localhost:6000',
				portfolio: [ { title: 'Get ready for fun :)' } ]
			}
		];
		database.levels = [
			{
				number: 1,
				name: 'level 1',
				challenges: [
					{
						title: 'Get ready for fun :)',
						file: 'public/challenge.ping/ping.html',
						requester: '../../test/support/empty.request',
						checker: '../../test/support/response.always.valid',
					},
					{
						title: 'Power of two',
						file: 'public/challenge.primeFactors/power.of.two.html',
						requester: '../../test/support/empty.request',
						checker: '../../test/support/response.always.valid',
					}
				]
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
					expect(browser.text("#result_1 .challenge")).toEqual('Get ready for fun :)');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('200');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('"a correct expected value"');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual('"a correct actual value"');
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
					expect(browser.text("#result_1 .challenge")).toEqual('Get ready for fun :)');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('501');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('"a correct expected value"');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual('"an incorrect value"');
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
					expect(browser.text("#result_1 .challenge")).toEqual('Get ready for fun :)');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .status")).toEqual('200');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .expected")).toEqual('"a correct expected value"');
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual('"a correct actual value"');
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
					expect(browser.text("#result_2 .challenge")).toEqual('Power of two');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	
});
		
		
