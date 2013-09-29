var thePlayer = require('./utils/player.utils');

logSuccess = function(player, challenge) {
	if (thePlayer.isANew(player)) {
		player.portfolio = [];
	}		
	player.portfolio.push( { 
			title: challenge,
		} 
	);
	if (player.score == undefined) player.score = 0;
	player.score += 10;
};

var module = module || {};
module.exports = logSuccess;