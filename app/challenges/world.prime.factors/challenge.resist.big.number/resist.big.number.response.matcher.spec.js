var matcher = require('./lib/resist.big.number.response.matcher');

describe('Resist big number matcher', function() {
	
	it('has a number chooser', function() {
		expect(matcher.numberChooser.getNumber()).toBeGreaterThan(1e6);
	});
	
	it('knows the expected answer', function() {
		expect(matcher.expectedResult(4200000)).toEqual('too big number (>1e6)');		
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
			var error = '<html><body>' + 
							'<label id="result">too big number (>1e6)</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					if (request.url == '/go') {
						response.write(error);
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
				expect(status.expected).toEqual("#result containing 'too big number (>1e6)'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("#result containing 'too big number (>1e6)'");
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
				expect(status.expected).toEqual("#result containing 'too big number (>1e6)'");
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
	
	describe('When server does not respond the correct error message,', function () {
		
		beforeEach(function() {
			var content = '<html><body>' + 
							'<label id="result">any</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					if (request.url == '/go') {
						response.write(content);
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
				expect(status.expected).toEqual("#result containing 'too big number (>1e6)'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("#result containing 'any'");
				done();
			});
		});
		
	});
});
