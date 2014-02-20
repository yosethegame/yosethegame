var matcher = require('./lib/get.water.fast.response.matcher');

describe('When the answer has the correct format,', function() {
    
	var request;
	var remoteAnswer;
	var status;

    describe('but the plane never reaches the targeted water,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=5&map=W..P......W....';
            remoteAnswer = JSON.stringify({
                map: [
                    "W..P.",
                    ".....",
                    "W...."
                ],
                moves: [
                    { dx:0, dy:1 },
                    { dx:0, dy:1 },
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
			expect(status.expected).toContain('plane must reach nearest water at { x:0, y:0 }');
		});

		it('sets actual', function() {
			expect(status.got).toContain('plane never reached target');
		});
    });
});