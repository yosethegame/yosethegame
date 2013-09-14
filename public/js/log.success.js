var thePlayer = require('./utils/player.utils');

logSuccess = function(player, challenge, database) {
	if (thePlayer.isANew(player)) {
		player.portfolio = [];
	}		
	player.portfolio.push( { 
			title: challenge.title,
		} 
	);
	database.savePlayer(player);
};

var module = module || {};
module.exports = logSuccess;