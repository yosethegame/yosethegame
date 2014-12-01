module.exports = {
	
	isUndefined: function(matcher) {
		describe(matcher.name + ' > When the header is undefined,', function() {

			var status;

			beforeEach(function(done) {
				matcher.validate({}, { statusCode: 200 }, {}, function(receivedStatus) {
					status = receivedStatus;
					done();
				});
			});

			it('sets code to 501', function() {
				expect(status.code).toEqual(501);
			});

			it('sets expected', function() {
				expect(status.expected).toEqual('content-type = text/html');
			});
			
			it('sets actual', function() {
				expect(status.got).toEqual('Error: content-type = undefined');
			});
		}); 
	},

	isEmpty: function(matcher) {
		describe(matcher.name + ' > When the header is empty,', function() {

			var status;

			beforeEach(function(done) {
				matcher.validate({}, { statusCode: 200, headers: { } }, {}, function(receivedStatus) {
					status = receivedStatus;
					done();
				});
			});

			it('sets code to 501', function() {
				expect(status.code).toEqual(501);
			});

			it('sets expected', function() {
				expect(status.expected).toEqual('content-type = text/html');
			});
			
			it('sets actual', function() {
				expect(status.got).toEqual('Error: content-type = undefined');
			});
		}); 
	},

	isNotTextHtml: function(matcher) {
		describe(matcher.name + ' > When the header is not text/html,', function() {

			var status;

			beforeEach(function(done) {
				matcher.validate({}, { statusCode: 200, headers: { 'content-type': 'any/thing'}}, {}, function(receivedStatus) {
					status = receivedStatus;
					done();
				});
			});

			it('sets code to 501', function() {
				expect(status.code).toEqual(501);
			});
			
			it('sets expected', function() {
				expect(status.expected).toEqual('content-type = text/html');
			});

			it('sets actual', function() {
				expect(status.got).toEqual('Error: content-type = any/thing');
			});
		});
	},
};