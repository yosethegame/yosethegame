var matcher = require('./lib/docker.response.matcher');
var failsWhenTheResponse = require('../common/fails.when.the.response');

describe('Docker response matcher,', function() {
    
    it('fails when remote server does not respond with html', function() {
        require('../common/fails.when.the.remote.server').doesNotAnswerWithHtml(matcher);
    });
    
	it('knows the expected behaviour', function() {
        expect(matcher.expectedBehaviour('104 P')).toEqual('A page with elements input#ship and button#dock, and an element #ship-1 containing "104 P" after submiting this ship name');
	});
    
    describe('fails when the response is', function() {
        failsWhenTheResponse.is('<html><body></body></html>', 'Error: missing element input#ship', matcher);
        failsWhenTheResponse.is('<html><body><input id="ship"/></body></html>', 'Error: missing element button#dock', matcher);
    });
});