var thePlayer = require('../js/utils/player.utils');

var logServer = function(player, server) {
	if (thePlayer.isANew(player)) {
		player.portfolio = [ {
			server: undefined,
			achievements : []
		} ];
	}		
	player.portfolio[0].server = server;
};

module.exports = logServer;