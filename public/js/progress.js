var array = require('./array.utils');
var thisPlayer = require('./player.utils');
var withAttribute = require('./array.matchers');

doneChallengeCount = function(player, database) {
	var count = 0;
	array.forEach(database.challenges, function(challenge) {
		count += array.hasOneItemIn(player.portfolio, withAttribute.titleEqualsTo(challenge.title)) ? 1 : 0;
	});
	return count;
}

progressOf = function(player, database) {
	if (thisPlayer.isANew(player)) return 0;

	var count = doneChallengeCount(player, database);
	return Math.round(100 * count / database.challenges.length, 0);
};

module.exports = progressOf;