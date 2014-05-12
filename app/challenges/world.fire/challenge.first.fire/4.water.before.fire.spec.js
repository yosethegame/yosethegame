var matcher = require('./lib/first.fire.response.matcher');
var json200 = require('../../common/lib/json200');

describe('When the answer has the correct format,', function() {
    
	var request;
	var remoteAnswer;
	var status;

    describe('but the plane never takes water,', function() {
        
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

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toContain('plane must first take water and then reach the fire');
		});

		it('sets actual', function() {
			expect(status.got).toContain('plane never took water');
		});
    });
    
    describe('but the plane never reaches the fire,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=PW.F';
            remoteAnswer = JSON.stringify({
                map: [
                    "PW",
                    ".F"
                ],
                moves: [
                    { dx:1, dy:0 },
                ]
            });

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toContain('plane must first take water and then reach the fire');
		});

		it('sets actual', function() {
			expect(status.got).toContain('plane never reached the fire');
		});
    });
    
    describe('but the plane reaches the fire before taking water,', function() {
        
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
                    { dx:0, dy:-1 },
                ]
            });

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toContain('plane must first take water and then reach the fire');
		});

		it('sets actual', function() {
			expect(status.got).toContain('plane reached the fire without water');
		});
    });
    
    describe('and the plane takes water and then reaches the fire,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=PW.F';
            remoteAnswer = JSON.stringify({
                map: [
                    "PW",
                    ".F"
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
			expect(status.expected).toContain('plane must first take water and then reach the fire');
		});

		it('sets actual', function() {
			expect(status.got).toContain('You did it!');
		});
    });
});