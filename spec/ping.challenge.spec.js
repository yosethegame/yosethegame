var Browser = require("zombie");
var serving = require('../public/js/serving');
var Server = require('../public/js/server');
var request = require('request');
var LevelPingListener = require('../public/challenge.ping/try.listener.js');

describe("Ping challenge", function() {

	var server = new Server(serving('public'));
	var pingChallengePage = "http://localhost:5000/challenge.ping/ping.html";
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("when the remote server is up and responds the expected answer", function() {
		
		var remote;

		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.write(JSON.stringify({ alive: true }));
					response.end();
				})
			.listen(6000);
		});

		afterEach(function() {
			remote.close();
		});

		it("you pass the level", function(done) {
			var browser = new Browser();
			browser.visit(pingChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#status")).toEqual("success!");
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
	});
	
	describe("when the remote server is up and responds un unexpected answer", function() {
		
		var remote;

		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.write('any');
					response.end();
				})
			.listen(6000);
		});

		afterEach(function() {
			remote.close();
		});

		it("you fail the level and get the expected answer", function(done) {
			var browser = new Browser();
			browser.visit(pingChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#status")).toEqual("fail :(: should return " + LevelPingListener.expectedAnswer);
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
	});
	
	describe("when the remote server is down", function() {
		
		it("you fail the level and are notified that your server is not responding", function(done) {
			var browser = new Browser();
			browser.visit(pingChallengePage).
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					expect(browser.text("#status")).toEqual("fail :(: server not responding(404)");
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
	});
	
	
});
		
		
