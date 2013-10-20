var matcher = require('../../public/challenge.share/share.response.matcher');

describe('Share response matcher,', function() {
	
	var remote;
	
	describe('When no serve answer', function() {
		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.expected).toContain("a page containing a#repository-link");
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
	
	describe('When server answsers 404', function() {
		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(404);
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.expected).toContain("a page containing a#repository-link");
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

	describe('When server does not answer a page with #repository-link,', function() {
		
		beforeEach(function() {
			var content = '<html><body>' + 
							'<labe>42</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.expected).toContain("a page containing a#repository-link");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toContain("missing element a#repository-link");
				done();
			});
		});
		
	});
	
	describe('When repository home page does not contain #readme element,', function() {
		
		beforeEach(function() {
			var content = '<html><body>' + 
							'<a href="http://localhost:6000" id="repository-link">42</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.expected).toContain("a repository with a readme file");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toContain("missing element #readme");
				done();
			});
		});
		
	});	
	
	describe('When readme file does not contain a reference to YoseTheGame,', function() {
		
		beforeEach(function() {
			var content = '<html><body>' + 
							'<a href="http://localhost:6000" id="repository-link">42</label>' +
							'<label id="readme">42</label>' +
			  			'</body></html>';			
			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);			
		});

		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000', {}, {}, function(status) {
				expect(status.expected).toContain("a repository with a readme file containing 'YoseTheGame'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/primeFactors/ui', {}, {}, function(status) {
				expect(status.got).toContain("missing reference to 'YoseTheGame' in element #readme");
				done();
			});
		});
		
	});
	
});