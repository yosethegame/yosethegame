var matcher = require('./lib/get.water.fast.response.matcher');

describe('When the answer has the correct format,', function() {
    
	var request;
	var remoteAnswer;
	var status;

    describe('but the plane does not end on the targeted water,', function() {
        
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
			expect(status.expected).toContain('plane must end over water at {"x":0,"y":0}');
		});

		it('sets actual', function() {
			expect(status.got).toContain('plane never reached target');
		});
    });

    describe('but the plane reaches another water point before,', function() {
        
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
                    { dx:-1, dy:0 },
                    { dx:-1, dy:0 },
                    { dx:-1, dy:0 },
                    { dx:0, dy:-1 },
                    { dx:0, dy:-1 },
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
			expect(status.expected).toContain('plane must end over water at {"x":0,"y":0}');
		});

		it('sets actual', function() {
			expect(status.got).toContain('plane reached another water point first');
		});
    });
    
    describe('and the plane reaches the targeted water,', function() {
        
		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=5&map=W..P......W....';
            remoteAnswer = JSON.stringify({
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

			matcher.validate(request, { headers: { 'content-type': 'application/json; charset=utf-8'}}, remoteAnswer, function(receivedStatus) {
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