module.exports = function(request, response, database) {
    response.setHeader('Content-Type', 'application/json');
    
    var login = /^\/players\/(.*)\/data$/.exec(request.url)[1];
    database.find(login, function(player) {
        
        if (player === undefined) {
            response.writeHead(404);
            response.end();
            return;
        }
        
        response.writeHead(200);
        var data = {
            login: player.login,
            score: player.score,
            avatar: player.avatar
        };
        
        response.write(JSON.stringify(data));
        response.end();
    });

};