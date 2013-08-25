progressOf = function(player, database) {
	if (player.portfolio == undefined || player.portfolio.length == 0) {
		return 0;
	}
	
	var count = 0;
	for(var i=0; i<database.challenges.length; i++) {
		var challengeToFindInPortfolio = database.challenges[i];
		var found = false;
		for(var j=0; j<player.portfolio.length; j++) {
			if (player.portfolio[j].title == challengeToFindInPortfolio.title) {
				found = true;
			}
		}
		if (found == true) {
			count = count + 1;
		}
	}					
	return Math.round(100 * count / database.challenges.length, 0);
};

module.exports = progressOf;