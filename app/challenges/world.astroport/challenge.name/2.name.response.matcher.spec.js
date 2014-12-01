var matcher = require('./lib/name.response.matcher');

describe('Name response matcher,', function() {
    
    it('fails', function() {
        require('../common/fails.when.the.remote.server').doesNotAnswer(matcher);
        require('../common/fails.when.the.remote.server').answersWith404(matcher);

        require('../common/fails.when.the.header').isUndefined(matcher);
        require('../common/fails.when.the.header').isEmpty(matcher);
        require('../common/fails.when.the.header').isNotTextHtml(matcher);        
    });
    
	it('knows the expected response', function() {
        expect(matcher.expected).toEqual('A page containing an element #astroport-name');
	});
    
    var status;
    
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