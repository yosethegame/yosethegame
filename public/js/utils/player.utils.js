var array = require('./array.utils');
var withAttribute = require('./array.matchers');

module.exports = {
	isANew: function(player) {
		return player.portfolio == undefined || player.portfolio.length == 0;
	},
	
	scoreOf: function(player) {
		return player.score ? player.score : 0;
	}
}