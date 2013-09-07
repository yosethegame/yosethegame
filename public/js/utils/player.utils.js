var array = require('./array.utils');
var withAttribute = require('./array.matchers');

module.exports = {
	isANew: function(player) {
		return player.portfolio == undefined || player.portfolio.length == 0;
	},
	
	hasTheGivenChallengeInPortfolio: function(title, player) {
		if (this.isANew(player)) return false;		
		return array.hasOneItemIn(player.portfolio, withAttribute.titleEqualsTo(title));
	}
}