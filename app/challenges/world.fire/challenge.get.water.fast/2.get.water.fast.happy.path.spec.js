var matcher = require('./lib/get.water.fast.response.matcher');
var json200 = require('../../common/lib/json200');

describe('Get water fast response matcher,', function() {
    
	var status;

    describe('When the plane reaches the targeted water,', function() {
        
		beforeEach(function(done) {
            var request = 'http://localhost:6000/fire/api?width=5&map=W..P......W....';
            var remoteAnswer = JSON.stringify({
                map: [
                    "W..P.",
                    ".....",
                    "W...."
                ],
                moves: [
                    { dx:-1, dy:0 },
                    { dx:-1, dy:0 },
                    { dx:-1, dy:0 },
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
			expect(status.expected).toContain('plane must end over water at {"x":0,"y":0}');
		});

		it('sets actual', function() {
			expect(status.got).toContain('You did it!');
		});
    });
});