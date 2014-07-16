module.exports = {

	doesNotAnswer: function(matcher) {
		
        describe(matcher.name + ' > When the remote server does not answer,', function() {

			var status;

            beforeEach(function(done) {
                matcher.validate({}, undefined, {}, function(receivedStatus) {
                    status = receivedStatus;
                    done();
                });
            });

            it('sets code to 404', function() {
                expect(status.code).toEqual(404);
            });
        
            it('sets expected', function() {
                expect(status.expected).toEqual('A running http server');
            });
        
            it('sets actual', function() {
                expect(status.got).toEqual('Error: 404');
            });
        }); 
	}
};