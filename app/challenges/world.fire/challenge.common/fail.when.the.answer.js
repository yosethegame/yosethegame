var json200 = require('../../common/lib/json200');

module.exports = {
    
    doesNotContainTheSentMap : function(matcher) {
        var status;
    
        describe(matcher.name + ' > When the answer does not contain the sent map,', function() {

            beforeEach(function(done) {
                var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
                var remoteAnswer = JSON.stringify({
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
    },
    
    doesNotContainAMap : function(matcher) {

        describe(matcher.name + ' > When the answer does not contain a map,', function() {

            beforeEach(function(done) {
                var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
                var remoteAnswer = JSON.stringify({});

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
    },
    
    isNull : function(matcher) {
        
        describe(matcher.name + ' > When the answer is null,', function() {

            beforeEach(function(done) {
                var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
                var remoteAnswer = JSON.stringify(null);

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
    },
    
    isNotAJsonObject : function(matcher) {

        describe(matcher.name + ' > When the answer is not a json object,', function() {

            beforeEach(function(done) {
                var request = 'http://localhost:6000/fire/api?width=2&map=ABCD';
                var remoteAnswer = 'anything';

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
    },
};
