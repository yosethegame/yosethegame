var url = require('url');

startover = function(request, response, database) {
	var params = url.parse(request.url, true);	
	var player = database.find(params.query.login);
	player.portfolio = [];
	player.server = undefined;
	database.savePlayer(player);
	response.end();
}

module.exports = startover;