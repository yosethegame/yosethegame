var matcher = require('./lib/first.fire.response.matcher');

describe('First fire response matcher,', function() {
	
	var remote;
	
	describe('When no server answers', function() {
		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.expected).toContain('To be defined');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toContain("404");
				done();
			});
		});
	});
		
});