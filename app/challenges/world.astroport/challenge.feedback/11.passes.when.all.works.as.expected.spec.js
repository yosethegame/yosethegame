var matcher = require('./lib/feedback.response.matcher');
var failsWhenTheResponse = require('../common/fails.when.the.response');

describe('Feedback response matcher when all works as expected,', function() {
    
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
                        '<div id="gate-3" class="free">' +
                            '<label id="ship-3"><label>' +
                        '</div>' +
                        '<input id="ship" oninput="reset();"/>' +
                        '<button id="dock" onclick="new Docker().dock(document);"></button>' +

                        '<script src="docker.js"></script>' +
        
                        '<label id="info" class="hidden"></label>' +
                  '</body></html>';

          var script = 'function Docker() {}' +                
                     
                       'Docker.prototype.dock = function(document) {' +
                           'var field = document.getElementById("ship");' +
                           'var gate = document.getElementById("gate-1");' +
                           'var ship = document.getElementById("ship-1");' +
                           'var info = document.getElementById("info");' +
    
                           "info.className = ''; " +
                           "gate.className = 'occupied'; " +
                           'ship.innerHTML = field.value;' +
                        '};' +
              
                        'function reset() { document.getElementById("info").className="hidden"; }';

        remote = require('http').createServer(function (request, response) {
            if (request.url == '/docker.js') { response.write(script); } else { response.write(content); }
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
    
	it('sets code to 200', function() {
		expect(status.code).toEqual(200);
	});

	it('sets expected', function() {
		expect(status.expected).toContain('Different elements providing feedback to the user');
	});

	it('sets actual', function() {
		expect(status.got).toEqual('You did it!');
	});                
});