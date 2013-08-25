var array = require('./array.utils');
var thisPlayer = require('./player.utils');

withTitle = function(title) {
	return function(item) {
		return item.title == title;
	};
}

doneChallengeCount = function(player, database) {
	var count = 0;
	array.forEach(database.challenges, function(challenge) {
		count += array.hasOneItemIn(player.portfolio, withTitle(challenge.title)) ? 1 : 0;
	});
	return count;
}

progressOf = function(player, database) {
	if (thisPlayer.isANew(player)) return 0;

	var count = doneChallengeCount(player, database);
	return Math.round(100 * count / database.challenges.length, 0);
};

module.exports = progressOf;