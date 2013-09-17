var array = require('./array.utils');
var withAttribute = require('./array.matchers');

module.exports = {
	isANew: function(player) {
		return player.portfolio == undefined || player.portfolio.length == 0;
	},
	
	hasTheGivenChallengeInPortfolio: function(title, player) {
		if (this.isANew(player)) return false;		
		return array.hasOneItemIn(player.portfolio, withAttribute.titleEqualsTo(title));
	},
	
	currentLevel: function(player, database) {
		if (this.isANew(player)) return database.levels[0];

		var self = this;
		var found = array.firstItemIn(database.levels, function(level) {
			return array.hasOneItemIn(level.challenges, function(challenge) {
				return !self.hasTheGivenChallengeInPortfolio(challenge.title, player);
			})
		});
		
		return found == undefined ? database.levels[database.levels.length-1] : found;
	},
	
	nextChallenge: function(player, database) {
		return this.nextChallengeInLevel(player, this.currentLevel(player, database));
	},

	nextChallengeInLevel: function(player, level) {
		var self = this;
		var found = array.firstItemIn(level.challenges, function(challenge) {
			return !self.hasTheGivenChallengeInPortfolio(challenge.title, player);
		});
		return found;
	},
}