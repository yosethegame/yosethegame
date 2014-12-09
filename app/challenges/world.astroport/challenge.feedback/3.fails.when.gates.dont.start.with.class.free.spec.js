var matcher = require('./lib/feedback.response.matcher');
var failsWhenTheResponse = require('../common/fails.when.the.response');

describe('Feedback response matcher when the gates do not contain class free,', function() {
    
    var remote;
    var content;
    
    var status;

    beforeEach(function(done) {
        content = '<html><body>' +
                        '<div id="gate-1" class="free">' +
                            '<label id="ship-1"><label>' +
                        '</div>' +
                        '<div id="gate-2" class="free">' +
                            '<label id="ship-2"><label>' +
                        '</div>' +
                        '<div id="gate-3" class="anything else">' +
                            '<label id="ship-3"><label>' +
                        '</div>' +
                        '<input id="ship"/>' +
                        '<button id="dock"></button>' +
                  '</body></html>';

        remote = require('http').createServer(function (request, response) {
            response.write(content);
            response.end();
        }).listen(6000);
            
		matcher.validate('http://localhost:6000', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
			status = receivedStatus;
			done();
		});            
    });

    afterEach(function() {
        remote.close();
    });
    
	it('sets code to 501', function() {
		expect(status.code).toEqual(501);
	});

	it('sets expected', function() {
		expect(status.expected).toContain("All #gate-x elements contain class 'free'");
	});

	it('sets actual', function() {
		expect(status.got).toEqual("Error: #gate-3 has class 'anything else'");
	});                
});