var json200 = require('./lib/json200');

module.exports = function(request) {
	
	return {
		
		whenTheAnswerIs: function(answer, matcher) {
			
			describe(matcher.name + ' > When remote server returns ' + JSON.stringify(answer) + ',', function() {

				var status;
				
				beforeEach(function(done) {
					matcher.validate(request, json200, JSON.stringify(answer), function(receivedStatus) {
						status = receivedStatus;
						done();
					});
				});

				it('sets code to 200', function() {
					expect(status.code).toEqual(200);
				});
		
				it('sets expected value to correct value and header', function() {
					expect(status.expected.body).toEqual(answer);
				});
		
				it('sets the actual value to the given value', function() {
					expect(status.got.body).toEqual(answer);
				});
			});
		},
		
		WhenTheAnswerIsWithExtraCarriageReturn: function(answer, matcher) {
			
			describe(matcher.name + ' > When remote server returns ' + JSON.stringify(answer) + ',', function() {

				var status;
				
				beforeEach(function(done) {
					matcher.validate(request, json200, JSON.stringify(answer) + '\n', function(receivedStatus) {
						status = receivedStatus;
						done();
					});
				});

				it('sets code to 200', function() {
					expect(status.code).toEqual(200);
				});
		
				it('sets expected value to correct value and header', function() {
					expect(status.expected.body).toEqual(answer);
				});
		
				it('sets the actual value to the given value', function() {
					expect(status.got.body).toEqual(answer);
				});
			});
		},
	};
};