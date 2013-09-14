var url = require('url');

startover = function(request, response, database) {
	var params = url.parse(request.url, true);	
	database.find(params.query.login, function(player) {
		if (player != undefined) {
			player.portfolio = [];
			player.server = undefined;
			database.savePlayer(player);
		}
		response.end();
	});
}

module.exports = startover;