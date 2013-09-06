var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var FileDatabase = require('../public/js/fileDatabase');
var fs = require('fs');

describe("Prime factors decomposition level", function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new FileDatabase('spec/data');
		if (fs.existsSync('spec/data/player.annessou')) {
			fs.unlinkSync('spec/data/player.annessou');
		}
		database.createPlayer(
			{
				login: 'annessou',
			});
		database.challenges = [
			{
				title: 'Get ready for fun :)',
				file: 'public/challenge.ping/ping.html',
				requester: '../challenge.ping/ping.requester.js',
				checker: '../challenge.ping/ping.response.matcher.js'
			},
			{
				title: 'Power of two',
				file: 'public/challenge.primeFactors/power.of.two.html',
				requester: '../challenge.primeFactors/power.of.two.requester.js',
				checker: '../challenge.primeFactors/power.of.two.response.matcher.js'
			}
			];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When player passes the ping challenge", function() {
		
		var remote;

		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(200, {'Content-Type': 'application/json'});
					response.write(JSON.stringify({ alive: true }));
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it("saves the server used", function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou').
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					var player = database.find('annessou');
					expect(player.server).toEqual('http://localhost:6000');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});		
		
		it('makes the challenge to be in the portfolio of the player', function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou').
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					var player = database.find('annessou');
					expect(player.portfolio[0].title).toEqual('Get ready for fun :)')
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});	
		
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
					expect(browser.text("#result_1 .expected")).toEqual(JSON.stringify({ 'content-type': 'application/json', body: { alive: true } }));
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual(JSON.stringify({ 'content-type': 'application/json', body: { alive: true } }));
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe("When player fails the ping challenge", function() {
		
		var remote;

		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.write('bad answer with incorrect header');
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
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
					expect(browser.text("#result_1 .expected")).toEqual(JSON.stringify({ 'content-type': 'application/json', body: { alive: true } }));
					done();
				}).
				then(function() {
					expect(browser.text("#result_1 .got")).toEqual(JSON.stringify({ body: "bad answer with incorrect header" }));
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	
});
		
		
