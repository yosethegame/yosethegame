var matcher = require('./lib/name.response.matcher');

describe('Name response matcher,', function() {
    
	it('knows the expected response', function() {
        expect(matcher.expected).toEqual('A page containing an element #astroport-name');
	});
    
    var status;
    
    describe('when the server does not respond', function() {
        
        beforeEach(function(done) {
			matcher.validate('', { statusCode: 404 }, '', function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: 404');
		});        
    });

    describe('when the server does not respond with html', function() {
        
        beforeEach(function(done) {
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/plain'} }, '', function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: content-type text/plain');
		});        
    });

    describe('when the server responds with no content-type', function() {
        
        beforeEach(function(done) {
			matcher.validate('', { statusCode: 200 }, '', function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing content-type');
		});        
    });
    
    describe('when the server responds with missing element', function() {
        
        beforeEach(function(done) {
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, 
                             '<html><body></body></html>', function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #astroport-name');
		});        
    });
    
    describe('when the server responds with the expected element', function() {
        
        beforeEach(function(done) {
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, 
                             '<html><body id="astroport-name"></body></html>', function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain(matcher.expected);
		});        
    });
});