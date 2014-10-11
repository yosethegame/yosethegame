var request = require('request');

module.exports = function(incoming, response, database, done) {
    
    var login = /^\/players\/(.*)\/badge\.png$/.exec(incoming.url)[1];
    
    database.find(login, function(player) {
        
        if (player === undefined) {
            response.writeHead(404);
            response.end();            

            if (done !== undefined) { done(); }
            return;
        }
        
        var url = 'http://img.shields.io/badge/yose-'+ player.score +'-brightgreen.png';
        
        request.get({ url:url, encoding: 'binary' }, function(error, shieldsResponse, body) {

            response.setHeader('Content-Type', 'image/png');
            response.writeHead(200);
            response.end(body, 'binary');                        

            if (done !== undefined) { done(); }
        });        
    });
};