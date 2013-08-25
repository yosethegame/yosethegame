var array = require('./array.utils');

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

thisIsANew = function(player) {
	return player.portfolio == undefined || player.portfolio.length == 0;
}

progressOf = function(player, database) {
	if (thisIsANew(player)) return 0;

	var count = doneChallengeCount(player, database);
	return Math.round(100 * count / database.challenges.length, 0);
};

module.exports = progressOf;