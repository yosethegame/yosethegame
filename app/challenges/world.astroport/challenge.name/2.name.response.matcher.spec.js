var matcher = require('./lib/name.response.matcher');
var failsWhenTheResponse = require('../common/fails.when.the.response');
var passesWhenTheResponse = require('../common/passes.when.the.response');

describe('Name response matcher,', function() {
    
    it('fails when remote server does not respond with html', function() {
        require('../common/fails.when.the.remote.server').doesNotAnswerWithHtml(matcher);
    });
    
	it('knows the expected response', function() {
        expect(matcher.expected).toEqual('A page containing an element #astroport-name');
	});
    
    describe('fails when the response is', function() {
        failsWhenTheResponse.is('<html><body></body></html>', 'Error: missing element #astroport-name', matcher);
    });
    
    describe('passes when the response is', function() {
        passesWhenTheResponse.is('<html><body id="astroport-name"></body></html>', matcher)
    });
    
});