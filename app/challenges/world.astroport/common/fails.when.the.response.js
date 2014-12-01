module.exports = {
    
    is: function(actual, message, matcher) {
        
        describe(actual, function() {
    
            var status;
    
            beforeEach(function(done) {
    			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, actual, function(receivedStatus) {
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
    			expect(status.got).toContain(message);
    		});        
        });
    }
};