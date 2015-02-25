var qs = require('querystring');
var news = require('../../feature.news/lib/news.builder');

postNewPlayer = function(request, response, database) {

	var body = '';
    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
		var form = qs.parse(body);	
		var player = { login: form.login, avatar: form.avatar, score: 0 };	
		database.find(form.login, function(found) {
            if (found === undefined) {
                database.createPlayer(player, function() {
                    database.addNews(news.playerCreated(player), function() {
                        response.writeHead(301, { 'Location': '/players/' + player.login });
                        response.end();
                    });
                });
            }
            else {
                response.writeHead(301, { 'Location': '/players/' + form.login });
                response.end();
            }
		});
    });

};

module.exports = postNewPlayer;