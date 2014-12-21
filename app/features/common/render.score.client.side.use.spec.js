describe('Score rendering', function() {
    
    var server;
    
    beforeEach(function() {
        var html = '<html>' +
                        '<head>' +
                            '<script src="render.score.js"></script>' +
                        '</head>' +
                        '<body>' +
                            '<label id="score"></label>' +
                            '<script>' +
                                'document.getElementById("score").innerHTML = renderScore(42);' +
                            '</script>' +
                        '</body>' +
                   '</html>';
       var script = require('fs').readFileSync('./app/features/common/lib/render.score.js').toString();
        
        server = require('http').createServer(function(request, response) {
            if (request.url == '/render.score.js') { response.write(script); } else { response.write(html); }
            response.end();
        }).listen(6000);
    });
    
    afterEach(function() {
        server.close();
    });
    
    it('can be used client-side is possible', function(done) {
        var Zombie = require('zombie');
        var browser = Zombie.create();
        browser.visit('http://localhost:6000').
            then(function() {
                expect(browser.text("#score")).toEqual('000042');
                done();
            });
    });	
});