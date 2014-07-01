var matcher = require('./lib/emergency.response.matcher');
var json200 = require('../../common/lib/json200');

describe('Emergency response matcher,', function() {

	var request;
	var remoteAnswer;
	var status;
	
    describe('When the plane gets the nearest water and then gets to the fire', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=4&map=ABCD';
            remoteAnswer = JSON.stringify({
                map: [
                    "P.W.",
                    "..FW"
                ],
                moves: [
                    { dx:1, dy:0 },
                    { dx:0, dy:1 },
                ]
            });

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain('3 moves to reach the nearest water and the fire. map = ["P.W.","..FW"]');
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('You did it!');
		});
	});

});