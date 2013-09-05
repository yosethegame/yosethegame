log = function(options, database) {
	var player = database.find(options.login);
	player.server = options.server;
	database.savePlayer(player);
};

var module = module || {};
module.exports = log;