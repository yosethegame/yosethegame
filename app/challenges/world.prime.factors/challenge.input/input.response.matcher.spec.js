var matcher = require('./lib/input.response.matcher');

describe('Input response matcher,', function() {
	
	it('has a number chooser', function() {
		expect(matcher.numberChooser.getNumber()).toBeGreaterThan(1);
	});
	
	it('knows the expected answer', function() {
		expect(matcher.expectedResult(42)).toEqual('42 = 2 x 3 x 7');		
	});
	
	var remote;

	var form = '<html><body>' +
					'<label id="title">title</label>' +
					'<label id="invitation">invitation</label>' +
					'<input id="number">' +
					'<button id="go" onclick="window.location=\'/go\'">go</button>' +
			  '</body></html>';			
			
	describe('When server answer expected answer,', function() {
		
		beforeEach(function() {
			matcher.numberChooser = { getNumber: function() { return 42; } }
			var decomposition = '<html><body>' + 
							'<label id="result">42 = 2 x 3 x 7</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					if (request.url == '/go') {
						response.write(decomposition);
					} else {
						response.write(form);
					}
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 200', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.code).toEqual(200);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.expected).toEqual("#result containing '42 = 2 x 3 x 7'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("#result containing '42 = 2 x 3 x 7'");
				done();
			});
		});
		
	});
	
	describe('When server does not include #result is the response,', function () {
		
		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.write(form);
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.expected).toEqual("#result containing '42 = 2 x 3 x 7'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("Error: missing element #result");
				done();
			});
		});
		
	});
	
	describe('When server does not respond correct decomposition,', function () {
		
		beforeEach(function() {
			matcher.numberChooser = { getNumber: function() { return 42; } }
			var decomposition = '<html><body>' + 
							'<label id="result">42 = 2 x 3 x 7 x 1000</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					if (request.url == '/go') {
						response.write(decomposition);
					} else {
						response.write(form);
					}
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.expected).toEqual("#result containing '42 = 2 x 3 x 7'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("#result containing '42 = 2 x 3 x 7 x 1000'");
				done();
			});
		});
		
	});
	
});