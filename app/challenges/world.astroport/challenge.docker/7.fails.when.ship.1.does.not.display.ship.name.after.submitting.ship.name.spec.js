var matcher = require('./lib/docker.response.matcher');

describe('Docker response matcher when #ship-1 dos not display correct ship name,', function() {
    
    var remote;
    var content;
    
    var status;
    var oldShipChooser;

    beforeEach(function(done) {
        content = '<html><body>' +
                        '<label id="ship-1">something else<label>' +
                        '<input id="ship"/>'+
                        '<button id="dock"></button>'+
                  '</body></html>';
        remote = require('http').createServer(function (request, response) {
                response.write(content);
                response.end();
            }).listen(6000);
            
        oldShipChooser = matcher.willEnterShip;
        matcher.willEnterShip = function() { return 'Goldorak'; };
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
		expect(status.expected).toContain('element #ship-1 containing "Goldorak" after submiting this ship name');
	});

	it('sets actual', function() {
		expect(status.got).toContain("Error: #ship-1 contains 'something else'");
	});                

});