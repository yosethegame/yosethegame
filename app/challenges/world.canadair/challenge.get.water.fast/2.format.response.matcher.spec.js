var matcher = require('./lib/get.water.fast.response.matcher');
var json200 = require('../../common/lib/json200');

describe('Get water fast response matcher,', function() {
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

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
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
			expect(status.got).toContain('map = ["anything","but","the expected map"]');
		});
	});
	
	describe('When the answer does not contain a map', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = JSON.stringify({});

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
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
			expect(status.got).toContain('missing field "map"');
		});
	});
		
	describe('When the answer is null', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = JSON.stringify(null);

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
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
			expect(status.got).toContain('missing field "map"');
		});
	});
	
	describe('When the answer is not a json object', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = 'anything';

			matcher.validate(request, json200, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain('A Json object');
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('"anything"');
		});
	});
	
	describe('When the header is not application/json', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = 'anything';

			matcher.validate(request, {statusCode: 200, headers: { 'content-type': 'text/plain'}}, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain('A content-type application/json in header');
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('A different content-type');
		});
	});
	
	describe('When the remote response is undefined', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = 'anything';

			matcher.validate(request, undefined, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain('A Json object');
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('An empty response');
		});
	});
	
	describe('When the remote response has statusCode other than 200', function() {

		beforeEach(function(done) {
            request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
            remoteAnswer = 'anything';

			matcher.validate(request, { statusCode: 404 }, remoteAnswer, function(receivedStatus) {
                status = receivedStatus;
				done();
			});
        });

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toContain('A Json object');
		});
		
		it('sets actual', function() {
			expect(status.got).toContain('Error 404');
		});
	});
});