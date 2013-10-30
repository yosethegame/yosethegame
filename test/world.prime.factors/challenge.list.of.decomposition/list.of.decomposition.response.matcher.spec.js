describe('List of decomposition response matcher', function() {

	var matcher;
	var initialStringChooser = undefined;
	
	beforeEach(function() {
		matcher = require('../../../public/world.prime.factors/challenge.list.of.decomposition/list.of.decomposition.response.matcher');
		if (initialStringChooser == undefined) {
			initialStringChooser = matcher.stringChooser;
		} else {
			matcher.stringChooser = initialStringChooser;
		}
	});
	
	it('has a correct number chooser', function() {
		expect(matcher.numberChooser.getNumber()).toBeGreaterThan(1);
		expect(matcher.numberChooser.getNumber()).toBeLessThan(1e6);
	});
	
	it('has a string chooser', function() {
		expect(typeof matcher.stringChooser.getString()).toEqual('string');
	});
	
	it('knows the expected result of a number', function() {
		expect(matcher.expectedResult(42)).toEqual('42 = 2 x 3 x 7');
	});
	
	var alreadyCalled;
	var fakeNumberChooser = {
		getNumber: function() {
			if (alreadyCalled) return 42;
			alreadyCalled = true;
			return 300;
		}
	};
	
	it('builds an input combining 2 integers and one string', function() {
		alreadyCalled = false;
		matcher.numberChooser = fakeNumberChooser;
		matcher.stringChooser = { getString: function() { return 'yolo'; } };
				
		expect(matcher.getInput()).toEqual('300, 42, yolo');
	});
	
	var remote;
	
	describe('When the result list is missing,', function() {
		
		beforeEach(function() {
			var page = '<html><body>' +
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
				expect(status.expected).toContain("A page containing a list ol#results");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: missing element ol#results');
				done();
			});
		});
		
	});
	
	describe('When the first decomposition is missing,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
							'</ol>' +
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
				expect(status.expected).toContain("ol#results li:nth-of-type(1) containing 300 = 2 x 2 x 3 x 5 x 5");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: missing element ol#results li:nth-of-type(1)');
				done();
			});
		});
		
	});
	
	describe('When the second decomposition is missing,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2 x 3 x 5 x 5</li>' +
							'</ol>' +
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
				expect(status.expected).toContain("ol#results li:nth-of-type(2) containing 42 = 2 x 3 x 7");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: missing element ol#results li:nth-of-type(2)');
				done();
			});
		});
		
	});
	
	describe('When the decomposition in error is missing,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			matcher.stringChooser = { getString: function() { return 'yolo'; } };
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2 x 3 x 5 x 5</li>' +
								'<li>42 = 2 x 3 x 7</li>' +
							'</ol>' +
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
				expect(status.expected).toContain("ol#results li:nth-of-type(3) containing yolo is not a number");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: missing element ol#results li:nth-of-type(3)');
				done();
			});
		});
		
	});
	
	describe('When there is not exactly 3 decompositions,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			matcher.stringChooser = { getString: function() { return 'yolo'; } };
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2 x 3 x 5 x 5</li>' +
								'<li>42 = 2 x 3 x 7</li>' +
								'<li>yolo is not a number</li>' +
								'<li>hello yose :)</li>' +
							'</ol>' +
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
				expect(status.expected).toContain("ol#results with 3 items");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: ol#results has 4 li');
				done();
			});
		});
		
	});
	
	describe('When first decomposition is incorrect,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2</li>' +
								'<li>42 = 2 x 3 x 7</li>' +
								'<li>yolo is not a number</li>' +
							'</ol>' +
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
				expect(status.expected).toContain("ol#results li:nth-of-type(1) containing 300 = 2 x 2 x 3 x 5 x 5");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: ol#results li:nth-of-type(1) contains 300 = 2 x 2');
				done();
			});
		});
		
	});
	
	describe('When second decomposition is incorrect,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2 x 3 x 5 x 5</li>' +
								'<li>42 = 2 x 3 x 7 x 1000</li>' +
								'<li>yolo is not a number</li>' +
							'</ol>' +
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
				expect(status.expected).toContain('ol#results li:nth-of-type(2) containing 42 = 2 x 3 x 7');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: ol#results li:nth-of-type(2) contains 42 = 2 x 3 x 7 x 1000');
				done();
			});
		});
		
	});
	
	describe('When the decomposition in error is incorrect,', function() {
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			matcher.stringChooser = { getString: function() { return 'yolo'; } };
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2 x 3 x 5 x 5</li>' +
								'<li>42 = 2 x 3 x 7</li>' +
								'<li>hello :)</li>' +
							'</ol>' +
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
				expect(status.expected).toContain("ol#results li:nth-of-type(3) containing yolo is not a number");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual('Error: ol#results li:nth-of-type(3) contains hello :)');
				done();
			});
		});
		
	});	
	
	describe('When all is fine,', function() {
		
		var expected;
		
		beforeEach(function() {
			alreadyCalled = false;
			matcher.numberChooser = fakeNumberChooser;
			matcher.stringChooser = { getString: function() { return 'yolo'; } };
			var page = '<html><body>' +
							'<input id="number">' +
							'<button id="go">go</button>' +							
							'<ol id="results">' +
								'<li>300 = 2 x 2 x 3 x 5 x 5</li>' +
								'<li>42 = 2 x 3 x 7</li>' +
								'<li>yolo is not a number</li>' +
							'</ol>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(page);
					response.end();
				})
			.listen(6000);			
			
			expected= "A page containing a list ol#results with 3 items"
					  + " AND ol#results li:nth-of-type(1) containing 300 = 2 x 2 x 3 x 5 x 5"
					  + " AND ol#results li:nth-of-type(2) containing 42 = 2 x 3 x 7"
					  + " AND ol#results li:nth-of-type(3) containing yolo is not a number"
			
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
				expect(status.expected).toEqual(expected);
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual(expected);
				done();
			});
		});
	});
});
