module.exports = {
	
	isEmpty: function(matcher) {

        describe(matcher.name + ' > When the header is empty,', function() {

			var status;

            beforeEach(function(done) {
                matcher.validate({}, { statusCode: 200, headers: { 'content-type': 'text/plain'}}, {}, function(receivedStatus) {
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
                expect(status.got['content-type']).toEqual('text/plain');
            });
        }); 
	},
	
	isNotApplicationJson: function(matcher) {

        describe(matcher.name + ' > When the header is not application/json,', function() {

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
                expect(status.expected['content-type']).toEqual('application/json');
            });
        
            it('sets actual', function() {
                expect(status.got['content-type']).toEqual('any/thing');
            });
        }); 
	},
};