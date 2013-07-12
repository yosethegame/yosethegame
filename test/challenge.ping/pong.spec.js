var request = require('request');
var Server = require('../../public/js/server');
var pong = require('../../public/challenge.ping/pong.js');

describe("Serving ping challenge", function() {

	var server = new Server(pong);

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When the remote server is up", function() {
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
		
		it("returns the remote answer", function(done) {
			request("http://localhost:5000/ping?server=http://localhost:6000", function(error, response, body) {
				expect(body).toEqual('any');
				done();
			})
		});
	});
	
	describe("When the remote server is down", function() {

		it("returns not found", function(done) {
			request("http://localhost:5000/ping?server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(404);
				done();
			})
		});
	});
	
});

