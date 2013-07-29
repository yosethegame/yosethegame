var request = require('request');
var Server = require('../../public/js/server');
var pong = require('../../public/challenge.ping/pong.js');

describe("Serving ping challenge:", function() {

	var server = new Server({ gate: pong });

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When no remote server answers, ", function() {

		it("returns not found", function(done) {
			request("http://localhost:5000/ping?server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(404);
				done();
			})
		});
	});
	
	describe("When the remote server is up, ", function() {
		
		xdescribe("and responds the expected answser,", function() {
			var remote;

			beforeEach(function() {
				remote = require('http').createServer(
					function (request, response) {
						response.writeHead(200, {"Content-Type": "application/json"});
						response.write(JSON.stringify({ alive: true }));
						response.end();
					})
				.listen(6000);
			});

			afterEach(function() {
				remote.close();
			});

			it("returns success", function(done) {
				request("http://localhost:5000/ping?server=http://localhost:6000", function(error, response, body) {
					expect(response.statusCode).toEqual(200);
					done();
				})
			});
		});
		
		describe("and does not respond with application/json content-type,", function() {
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

			it("returns 501 (not implemented)", function(done) {
				request("http://localhost:5000/ping?server=http://localhost:6000", function(error, response, body) {
					expect(response.statusCode).toEqual(501);
					expect(body).toEqual(JSON.stringify({
						expected: {
							'content-type': 'application/json',
							body: { alive: true }
						},
						got: {
							'content-type': 'text/plain',
							body: 'any'
						}
					}));
					done();
				})
			});
		});
		
		describe("and does not respond with expected content,", function() {
			var remote;

			beforeEach(function() {
				remote = require('http').createServer(
					function (request, response) {
						response.writeHead(200, {"Content-Type": "application/json"});
						response.write('any');
						response.end();
					})
				.listen(6000);
			});

			afterEach(function() {
				remote.close();
			});

			it("returns 501 (not implemented)", function(done) {
				request("http://localhost:5000/ping?server=http://localhost:6000", function(error, response, content) {
					expect(response.statusCode).toEqual(501);
					expect(content).toEqual(JSON.stringify({
						expected: {
							'content-type': 'application/json',
							body: { alive: true }
						},
						got: {
							'content-type': 'application/json',
							body: 'any',
						}
					}));
					done();
				})
			});
		});
		
	});
	
	
	
});

