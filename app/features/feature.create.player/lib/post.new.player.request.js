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
		database.createPlayer(player, function() {
            database.addNews(news.playerCreated(player), function() {
                response.writeHead(201);
                response.end();
            });
		});
    });

};

module.exports = postNewPlayer;