var matcher = require('./lib/first.fire.response.matcher');

describe('When the answer has the correct format,', function() {
    
	var request;
	var remoteAnswer;
	var status;

    describe('but the plane never flies over the water,', function() {
        
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
    
    describe('but the plane never flies over the fire,', function() {
        
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

			matcher.validate(request, { headers: { 'content-type': 'application/json; charset=utf-8'}}, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toContain('your plane must fly over the fire');
		});

		it('sets actual', function() {
			expect(status.got).toContain('your plane never reached the fire');
		});
    });
    
    describe('but the plane flies over the fire before flying over the water,', function() {
        
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

			matcher.validate(request, { headers: { 'content-type': 'application/json; charset=utf-8'}}, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toContain('your plane must fly over water before flying over the fire');
		});

		it('sets actual', function() {
			expect(status.got).toContain('your plane flew over the fire without water');
		});
    });
    
    describe('and the plane flies over the water and then over the fire,', function() {
        
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

			matcher.validate(request, { headers: { 'content-type': 'application/json; charset=utf-8'}}, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});

		it('sets expected', function() {
			expect(status.expected).toContain('Extinguish that fire!');
		});

		it('sets actual', function() {
			expect(status.got).toContain('You did it!');
		});
    });
});