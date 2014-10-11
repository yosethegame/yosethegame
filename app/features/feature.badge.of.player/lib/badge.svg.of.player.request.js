var request = require('request');

module.exports = function(incoming, response, database, done) {
    
    var login = /^\/players\/(.*)\/badge\.svg$/.exec(incoming.url)[1];
    
    database.find(login, function(player) {
        
        if (player === undefined) {
            response.writeHead(404);
            response.end();            

            if (done !== undefined) { done(); }
            return;
        }
        
        var url = 'http://img.shields.io/badge/yose-'+ player.score +'-brightgreen.svg';

        request(url, function(error, shieldsResponse, body) {     
            response.setHeader('Content-Type', 'image/svg+xml');
            response.writeHead(200);
            response.write(body);
            response.end();
            
            if (done !== undefined) { done(); }
        });        
    });
};