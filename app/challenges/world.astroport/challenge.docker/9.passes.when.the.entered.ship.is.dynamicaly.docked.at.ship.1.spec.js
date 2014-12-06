var matcher = require('./lib/docker.response.matcher');
var failsWhenTheResponse = require('../common/fails.when.the.response');

describe('Docker response matcher when the element ship-1 is updated dynamically by the dock button,', function() {
    
    var remote;
    var content;
    
    var status;
    var oldShipChooser;

    beforeEach(function(done) {
        content = '<html><body>' +
                        '<label id="ship-1"><label>' +
                        '<input id="ship"/>' +
                        '<button id="dock" onclick="new Docker().dock(document);"></button>' +
                        '<script>' +
                            'function Docker() {}' +                
                            
                            'Docker.prototype.dock = function(document) {' +
                                'var field = document.getElementById("ship");' +
                                'var ship = document.getElementById("ship-1");' +
        
                                'ship.innerHTML = field.value;' +
                            '};' +
                        '</script>' +
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
    
	it('sets code to 200', function() {
		expect(status.code).toEqual(200);
	});

	it('sets expected', function() {
		expect(status.expected).toContain('element #ship-1 containing "Goldorak" after submiting this ship name');
	});

	it('sets actual', function() {
		expect(status.got).toEqual('You did it!');
	});                
});