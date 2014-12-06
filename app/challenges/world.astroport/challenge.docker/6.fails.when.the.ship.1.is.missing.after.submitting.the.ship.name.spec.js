var matcher = require('./lib/docker.response.matcher');

describe('Docker response matcher when #ship-1 is missing after submitting ship name,', function() {
    
    var remote;
    var content;
    
    var status;
    var oldShipChooser;

    beforeEach(function(done) {
        content = '<html><body>' +
                        '<input id="ship"/>'+
                        '<button id="dock"></button>'+
                  '</body></html>';
        remote = require('http').createServer(function (request, response) {
                response.write(content);
                response.end();
            }).listen(6000);
            
        oldShipChooser = matcher.willEnterShip;
        matcher.willEnterShip = function() { return 'Faucon Millenium'; };
		matcher.validate('http://localhost:6000', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
			status = receivedStatus;
            matcher.willEnterShip = oldShipChooser;
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
		expect(status.expected).toContain('element #ship-1 containing "Faucon Millenium" after submiting this ship name');
	});

	it('sets actual', function() {
		expect(status.got).toContain('Error: missing element #ship-1');
	});                

});