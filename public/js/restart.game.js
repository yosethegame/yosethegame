var url 			= require('url');
var thePlayer 		= require('./utils/player.utils');

restartgame = function(request, response, database) {
	var params = url.parse(request.url, true);	
	database.find(params.query.login, function(player) {
		if (player != undefined) {
			player.portfolio = [];
			player.server = undefined;
			player.score = 0;
			database.savePlayer(player, function() {
				response.end();
			});
		} else {
			response.end();
		}
	});
}

module.exports = restartgame;