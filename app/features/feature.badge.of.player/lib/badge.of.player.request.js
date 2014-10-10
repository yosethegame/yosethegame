var fs = require('fs');

module.exports = function(request, response, database) {
    response.setHeader('Content-Type', 'text/html');
    
    var login = /^\/players\/(.*)\/badge$/.exec(request.url)[1];
    
    database.find(login, function(player) {
        
        if (player === undefined) {
            response.writeHead(404);
            response.end();
            return;
        }
        
        var template = fs.readFileSync('./app/features/feature.badge.of.player/lib/badge.html').toString();
        var badge = template.replace('YoseScore', player.score);
        
        response.writeHead(200);
        response.write(badge);
        response.end();
    });
    
};