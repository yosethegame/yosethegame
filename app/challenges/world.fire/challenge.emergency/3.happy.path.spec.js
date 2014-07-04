var matcher = require('./lib/emergency.response.matcher');
var json200 = require('../../common/lib/json200');
var move = require('../challenge.common/lib/move');

describe('Emergency response matcher,', function() {

	var status;
	
    describe('When the plane minimizes the flight to water and fire', function() {

		var oldCandidates;

		var sentMap = [ 'W.P...', '....WF'];
		var moves = [ move.right, move.right, move.down, move.right ];

		beforeEach(function(done) {
			oldCandidates = matcher.candidates;
			matcher.candidates = [ { map: sentMap, expectedMoveCount: moves.length } ];
			
            var request = 'http://localhost:6000/fire/api?width=' + sentMap[0].length + '&map=' + sentMap.join('');

			matcher.validate(request, json200, JSON.stringify({ map: sentMap, moves: moves }), function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });
		
		afterEach(function() {
			matcher.candidates = oldCandidates;
		});

		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain(moves.length + ' moves to minimize the flight to water and fire. map = ' + JSON.stringify(sentMap));
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('You did it!');
		});
	});

});