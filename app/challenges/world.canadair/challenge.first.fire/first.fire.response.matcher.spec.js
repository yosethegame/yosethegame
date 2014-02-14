var matcher = require('./lib/first.fire.response.matcher');

describe('First fire response matcher,', function() {
	var request;
	var remoteAnswer;
	var status;
	
    describe('When the answer does not contain the sent map', function() {
	    
		beforeEach(function(done) {
    	    request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
    	    remoteAnswer = JSON.stringify({
    	        map: [
    	            "anything",
    	            "but",
    	            "the expected map"
    	        ]
    	    });

			matcher.validate(request, { headers: { 'content-type': 'application/json; charset=utf-8'}}, remoteAnswer, function(receivedStatus) {
			    status = receivedStatus;
				done();
			});
    	});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain('map = ["AB","CD"]');
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('map = ["anything","buy","the expected map"]');
		});
	});
		
});