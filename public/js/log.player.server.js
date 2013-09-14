log = function(player, server, database) {
	player.server = server;
	database.savePlayer(player);
};

var module = module || {};
module.exports = log;