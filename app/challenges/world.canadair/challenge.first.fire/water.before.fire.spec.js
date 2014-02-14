var matcher = require('./lib/first.fire.response.matcher');

describe('When the answer has the correct format,', function() {
    
	var request;
	var remoteAnswer;
	var status;

    describe('but the place never flies over the water,', function() {
        
		beforeEach(function(done) {
    	    request = 'http://localhost:6000/fire/api?width=2&map=PW.F';
    	    remoteAnswer = JSON.stringify({
    	        map: [
    	            "PW",
    	            ".F"
    	        ],
    	        moves: [
    	            { dx:0, dy:1 },
    	            { dx:1, dy:0 },
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
			expect(status.expected).toContain('your plane must fly over the water');
		});

		it('sets actual', function() {
			expect(status.got).toContain('your plane never flew over the water');
		});
    });
    
 
});