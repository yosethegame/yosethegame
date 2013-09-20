var url 			= require('url');
var thePlayer 		= require('./utils/player.utils');

restartgame = function(request, response, database) {
	var params = url.parse(request.url, true);	
	var player = database.find(params.query.login);
	if (player != undefined) {
		player.portfolio = [];
		player.server = undefined;
		database.savePlayer(player);
	}
	response.end();
}

module.exports = restartgame;