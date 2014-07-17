module.exports = function(request) {
	
	return {
		whenTheHeaderIsEmpty: function(matcher) {

			describe(matcher.name + ' > When the header is empty,', function() {

				var status;

				beforeEach(function(done) {
					matcher.validate(request, { statusCode: 200, headers: { } }, {}, function(receivedStatus) {
						status = receivedStatus;
						done();
					});
				});

				it('sets code to 501', function() {
					expect(status.code).toEqual(501);
				});
    
				it('sets expected', function() {
					expect(status.expected['content-type']).toEqual('application/json');
				});
				
				it('sets actual', function() {
					expect(status.got['content-type']).toEqual(undefined);
				});
			}); 
		},
		
		whenTheHeaderIsNotApplicationJson: function(matcher) {
			
			describe(matcher.name + ' > When the header is not application/json,', function() {

				var status;

				beforeEach(function(done) {
					matcher.validate(request, { statusCode: 200, headers: { 'content-type': 'any/thing'}}, {}, function(receivedStatus) {
						status = receivedStatus;
						done();
					});
				});

				it('sets code to 501', function() {
					expect(status.code).toEqual(501);
				});
				
				it('sets expected', function() {
					expect(status.expected['content-type']).toEqual('application/json');
				});

				it('sets actual', function() {
					expect(status.got['content-type']).toEqual('any/thing');
				});
			}); 
		},
		
		whenTheResponseIsNotInJsonFormat: function(matcher) {
			
			describe(matcher.name + ' > When remote server returns not a json content,', function() {

				var status;
			
				beforeEach(function(done) {
					matcher.validate('this-url/primeFactors?number=8', { statusCode: 200, headers: { 'content-type': 'application/json'}}, 'anything', function(receivedStatus) {
						status = receivedStatus;
						done();
					});
				});

				it('sets code to 501', function() {
					expect(status.code).toEqual(501);
				});
		
				it('sets expected value to correct value and header', function() {
					expect(status.expected['content-type']).toEqual('application/json');
				});
		
				it('sets the actual value to the given value', function() {
					expect(status.got.body).toEqual('anything');
				});
			});		
		},
	};
};