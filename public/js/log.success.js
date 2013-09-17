var thePlayer = require('./utils/player.utils');

logSuccess = function(options, database) {
	var player = database.find(options.login);		
	if (thePlayer.isANew(player)) {
		player.portfolio = [];
	}		
	player.portfolio.push( { 
			title: options.challenge.title,
			server: options.server 
		} 
	);
	database.savePlayer(player);
};

var module = module || {};
module.exports = logSuccess;