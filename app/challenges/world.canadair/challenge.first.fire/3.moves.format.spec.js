var matcher = require('./lib/first.fire.response.matcher');

describe('When the answer contains the correct map,', function() {
    
	var request;
	var remoteAnswer;
	var status;

    describe('but does not contain the moves,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = JSON.stringify({
                map: [
                    "AB",
                    "CD"
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
			expect(status.expected).toContain('A Json object with map and moves');
		});

		it('sets actual', function() {
			expect(status.got).toContain('missing field "moves"');
		});
    });
    
    describe('but the moves are in incorrect format,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = JSON.stringify({
                map: [
                    "AB",
                    "CD"
                ],
                moves: 'any'
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
			expect(status.expected).toContain('Each move should have fields dx and dy');
		});

		it('sets actual', function() {
			expect(status.got).toContain('moves = "any"');
		});
    });
    
    describe('but the moves have offsets out of [-1, 0, +1] authorized values,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = JSON.stringify({
                map: [
                    "AB",
                    "CD"
                ],
                moves: [
                    { dx: 1, dy: -5 }
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
			expect(status.expected).toContain('Possible values for dx and dy are -1, 0 or 1');
		});

		it('sets actual', function() {
			expect(status.got).toContain('one move { dx:1, dy:-5 }');
		});
    });
    
    describe('but the moves is in very incorrect format,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = JSON.stringify({
                map: [
                    "AB",
                    "CD"
                ],
                moves: 23
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
			expect(status.expected).toContain('moves should be in an array');
		});

		it('sets actual', function() {
			expect(status.got).toContain('moves = 23');
		});
    });
    
    describe('but one of the moves is missing dx or dy,', function() {
        
        var moves;
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            moves = [
                { dx: 1, dy: 1},
                { dx: 1, toto: 1},
            ];
            remoteAnswer = JSON.stringify({
                map: [
                    "AB",
                    "CD"
                ],
                moves: moves
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
			expect(status.expected).toContain('Each move should have fields dx and dy');
		});

		it('sets actual', function() {
			expect(status.got).toContain('moves = ' + JSON.stringify(moves));
		});
    });
    
});