module.exports = {
    
    is: function(actual, matcher) {
  
        describe(actual, function() {
    
            beforeEach(function(done) {
    			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html; charset=utf-8'} }, actual, function(receivedStatus) {
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
    }
};