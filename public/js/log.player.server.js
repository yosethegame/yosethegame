log = function(player, server, database) {
	player.server = server;
	database.savePlayer(player, function() {
		
	});
};

var module = module || {};
module.exports = log;