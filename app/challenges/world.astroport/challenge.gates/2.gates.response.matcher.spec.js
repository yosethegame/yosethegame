var matcher = require('./lib/gates.response.matcher');
var failsWhenTheRemoteServer = require('../common/fails.when.the.remote.server');
var failsWhenTheResponse = require('../common/fails.when.the.response');
var passesWhenTheResponse = require('../common/passes.when.the.response');

describe('Name response matcher,', function() {
    
    it('fails when remote server does not respond with html', function() {
        require('../common/fails.when.the.remote.server').doesNotAnswerWithHtml(matcher);
    });
    
	it('knows the expected response', function() {
        expect(matcher.expected).toEqual('3 gates containing each a place for a ship');
	});
        
    describe('fails when the response is', function() {
        failsWhenTheResponse.is('<html><body></body></html>', 'Error: missing element #gate-1', matcher);
        failsWhenTheResponse.is('<html><body><div id="gate-1"/></body></html>', 'Error: missing element #gate-2', matcher);
        failsWhenTheResponse.is('<html><body><div id="gate-1"/><div id="gate-2"/></body></html>', 'Error: missing element #gate-3', matcher);

        failsWhenTheResponse.is('<html><body><div id="gate-1"/><div id="gate-2"/><div id="gate-3"/></body></html>', 'Error: missing element #ship-1 in element #gate-1', matcher);
        failsWhenTheResponse.is('<html><body><div id="gate-1"></div><div id="ship-1"/><div id="gate-2"/><div id="gate-3"/></body></html>', 'Error: missing element #ship-1 in element #gate-1', matcher);
        failsWhenTheResponse.is('<html><body><div id="gate-1"><div id="ship-1"/></div><div id="gate-2"></div><div id="ship-2"/><div id="gate-3"/></body></html>', 'Error: missing element #ship-2 in element #gate-2', matcher);
        failsWhenTheResponse.is('<html><body><div id="gate-1"><div id="ship-1"/></div><div id="gate-2"><div id="ship-2"/></div><div id="gate-3"></div><div id="ship-3"/></body></html>', 'Error: missing element #ship-3 in element #gate-3', matcher);
    });
    
    describe('passes when the response is', function() {
        passesWhenTheResponse.is('<html><body><div id="gate-1"><div id="ship-1"/></div><div id="gate-2"><div id="ship-2"/></div><div id="gate-3"><div id="ship-3"/></div></body></html>', matcher);
    });

});