var json200 = require('../../common/lib/json200');

module.exports = {

	isUndefined : function(matcher) {
		
		describe(matcher.name + ' > When the remote response is undefined', function() {

			beforeEach(function(done) {
				var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
				var remoteAnswer = 'anything';

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
	},
	
	hasStatusCodeOtherThan200 : function(matcher) {
		
		describe(matcher.name + ' > When the remote response has statusCode other than 200', function() {

			beforeEach(function(done) {
				var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
				var remoteAnswer = 'anything';

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
	},
};