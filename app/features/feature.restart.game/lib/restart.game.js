var url         = require('url');
var thePlayer   = require('../../../lib/player.utils');
var news = require('../../feature.news/lib/news.builder');

restartgame = function(request, response, database) {
	var params = url.parse(request.url, true);	
	database.find(params.query.login, function(player) {
		if (player !== undefined) {
			player.portfolio = [];			
			player.score = 0;
			database.savePlayer(player, function() {
                database.addNews(news.playerRestartedGame(player), function() {
                    response.end();
                });
			});
		} else {
			response.end();
		}
	});
};

module.exports = restartgame;