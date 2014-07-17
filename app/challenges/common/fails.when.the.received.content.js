var json200 = require('./lib/json200');

module.exports = {

	is: function(answer, matcher) {
		
        describe(matcher.name + ' > When the received content is not correct,', function() {

			var status;

            beforeEach(function(done) {
                matcher.validate({}, json200, answer, function(receivedStatus) {
                    status = receivedStatus;
                    done();
                });
            });

            it('sets code to 501', function() {
                expect(status.code).toEqual(501);
            });
        
            it('sets actual', function() {
                expect(status.got.body).toEqual(answer);
            });
        }); 
	},
};