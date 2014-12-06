var matcher = require('./lib/docker.response.matcher');

describe('Docker response matcher,', function() {
    
    var remote;
    var content;

    beforeEach(function() {
        content = '<html><body>' +
                        '<input id="ship"/>'+
                        '<button id="dock"></button>'+
                  '</body></html>';
        remote = require('http').createServer(function (request, response) {
                response.write(content);
                response.end();
            }).listen(6000);
    });

    afterEach(function() {
        remote.close();
    });
    
    it('enters a ship in the input field', function(done) {
        var oldShipChooser = matcher.willEnterShip;
        matcher.willEnterShip = function() { return 'Enter this ship name'; };
        matcher.validate('http://localhost:6000', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus, browser) {
            
            expect(browser.query('input#ship').value).toEqual('Enter this ship name');
            matcher.willEnterShip = oldShipChooser;
			done();
		});        
    });
    

});