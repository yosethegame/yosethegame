var matcher = require('./lib/one.page.response.matcher');

describe('One page response matcher', function() {
	
	it('has a correct number chooser', function() {
		expect(matcher.numberChooser.getNumber()).toBeGreaterThan(1);
		expect(matcher.numberChooser.getNumber()).toBeLessThan(1e6);
	});
	
	var remote;
	
	describe('When the form triggers a new location,', function() {
		
		beforeEach(function() {
			var form =  '<html><body>' +
                            '<input id="number">' +
                            '<button id="go" onclick="window.location=\'/go\'">go</button>' +
                        '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					if (request.url == '/go') {
						response.write('any');
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
				expect(status.expected).toContain("browser.location 'http://localhost:6000/primeFactors/ui'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("browser.location 'http://localhost:6000/go'");
				done();
			});
		});
		
	});
	
	describe('When the location remains the same and the result is missing,', function() {
		
		beforeEach(function() {
			matcher.numberChooser = { getNumber: function() { return 6; } };
			var page =  '<html><body>' +
                            '<input id="number">' +
                            '<button id="go">go</button>' +
                        '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(page);
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
				expect(status.expected).toContain("#result containing '6 = 2 x 3'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: missing element #result');
				done();
			});
		});
		
	});
	
	describe('When the location remains the same and the result is incorrect,', function() {
		
		beforeEach(function() {
			matcher.numberChooser = { getNumber: function() { return 6; } };
			var page =  '<html><body>' +
                            '<input id="number">' +
                            '<button id="go">go</button>' +
                            '<label id="result">any</label>' +
                        '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(page);
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
				expect(status.expected).toContain("#result containing '6 = 2 x 3'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toContain("#result containing 'any'");
				done();
			});
		});
		
	});
	
	describe('When the location remains the same and the result is correct,', function() {
		
		beforeEach(function() {
			matcher.numberChooser = { getNumber: function() { return 6; } };
			var page =  '<html><body>' +
                            '<input id="number">' +
                            '<button id="go">go</button>' +
                            '<label id="result">6 = 2 x 3</label>' +
                        '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(page);
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
				expect(status.expected).toEqual("browser.location 'http://localhost:6000/primeFactors/ui' AND #result containing '6 = 2 x 3'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("browser.location 'http://localhost:6000/primeFactors/ui' AND #result containing '6 = 2 x 3'");
				done();
			});
		});
		
	});
		
});
