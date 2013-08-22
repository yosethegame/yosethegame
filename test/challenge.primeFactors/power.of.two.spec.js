var request = require('request');
var Server = require('../../public/js/server');
var powerOfTwo = require('../../public/challenge.primeFactors/power.of.two.js');

Array.prototype.hasItem = function(item) {
	for (var i=0; i< this.length; i++) {
		if (this[i] == item) {
			return true;
		}
	}
	return false;
}; 

describe('Serving Power-of-two challenge', function() {

	var server = new Server({ gate: powerOfTwo });

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('chooses a power-of-two number', function() {
		expect([2, 4, 8, 16, 64, 128, 256, 512, 1024, 2048].hasItem(powerOfTwo.numberToAskDecompositionFor())).toBe(true);
	});
	
	it('chooses "randomly"', function() {
		var first = powerOfTwo.numberToAskDecompositionFor();
		var second = powerOfTwo.numberToAskDecompositionFor();
		var remainingAttempt = 5;
		while (second == first && remainingAttempt > 0) {
			second = powerOfTwo.numberToAskDecompositionFor();
			remainingAttempt --;
		}
		
		expect(first).not.toEqual(second);
	});
	
	describe("When no remote server answers, ", function() {

		it("returns not found", function(done) {
			request("http://localhost:5000/tryPowerOfTwo?server=http://localhost:6000", function(error, response, body) {
				expect(response.statusCode).toEqual(404);
				done();
			})
		});
	});
	
	describe('Request sent', function() {
		var sentRequest;
		
		var remote;
		var correctAnswer = JSON.stringify({ 
				number: 8,
				decomposition: [2, 2, 2]
			});
		
		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(200, {"Content-Type": "application/json"});
					response.write(correctAnswer);
					sentRequest = request.url;
					response.end();
				})
			.listen(6000);
		});

		afterEach(function() {
			remote.close();
		});
		
		it('asks for the decomposition of a number', function(done) {
			powerOfTwo.numberToAskDecompositionFor = function() { return 8; };
			request("http://localhost:5000/tryPowerOfTwo?server=http://localhost:6000/any/path", function(error, response, body) {
				expect(sentRequest).toEqual('/any/path?number=8');
				done();
			})
		});
	});
	
	describe("When the remote server is up, ", function() {
		
		describe("and responds the expected answser,", function() {
			var remote;
			var correctAnswer = JSON.stringify({ 
					number: 8,
					decomposition: [2, 2, 2]
				});

			beforeEach(function() {
			powerOfTwo.numberToAskDecompositionFor = function() { return 8; };
			remote = require('http').createServer(
					function (request, response) {
						response.writeHead(200, {"Content-Type": "application/json"});
						response.write(correctAnswer);
						response.end();
					})
				.listen(6000);
			});

			afterEach(function() {
				remote.close();
			});

			it("returns success", function(done) {
				request("http://localhost:5000/tryPowerOfTwo?server=http://localhost:6000", function(error, response, body) {
					expect(response.statusCode).toEqual(200);
					done();
				});
			});
			
			it("returns the remote answer", function(done) {
				request("http://localhost:5000/tryPowerOfTwo?server=http://localhost:6000", function(error, response, body) {
					expect(body).toEqual(correctAnswer);
					done();
				})
			});
		});
	});
	
});
