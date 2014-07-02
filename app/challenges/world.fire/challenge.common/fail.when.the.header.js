var json200 = require('../../common/lib/json200');

module.exports = {

    isNotApplicationJson: function(matcher) {
        
        describe(matcher.name + ' > When the header is not application/json', function() {

            beforeEach(function(done) {
                var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
                var remoteAnswer = 'anything';

                matcher.validate(request, { statusCode: 200, headers: { 'content-type': 'text/plain'}}, remoteAnswer, function(receivedStatus) {
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
    }
};
