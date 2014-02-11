var matcher = require('./lib/resist.negative.response.matcher');

describe('Resist negative response matcher', function() {
	
	it('has a negative number chooser', function() {
		expect(matcher.numberChooser.getNumber()).toBeLessThan(2);
	});
	
	it('knows the expected answer', function() {
		expect(matcher.expectedResult(-23)).toEqual('-23 is not an integer > 1');		
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
			matcher.numberChooser = { getNumber: function() { return -2342; } };
			var error = '<html><body>' + 
							'<label id="result">-2342 is not an integer > 1</label>' +
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
				expect(status.expected).toEqual("#result containing '-2342 is not an integer > 1'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toEqual("#result containing '-2342 is not an integer > 1'");
				done();
			});
		});
		
	});
	
	
});
