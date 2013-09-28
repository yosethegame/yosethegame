var thePlayer = require('./utils/player.utils');

logSuccess = function(player, challenge, database) {
	if (thePlayer.isANew(player)) {
		player.portfolio = [];
	}		
	player.portfolio.push( { 
			title: challenge.title,
		} 
	);
	if (player.score == undefined) player.score = 0;
	player.score += 10;
	database.savePlayer(player, function() {
		
	});
};

var module = module || {};
module.exports = logSuccess;