var array = require('./array.utils');

function Sorter() { };

Sorter.prototype.sort = function(a, b) {
	return indexOfChallenge(a) - indexOfChallenge(b);
};

var indexOfChallenge = function(o) {
	var title = o.item.challenge;
	var database = o.database;
	
	var index = 0;
	var found = false;
	array.forEach(database.levels, function(level) {
		array.forEach(level.challenges, function(challenge) {
			if (challenge.title == title) {
				found = true;
			}
			if (!found) {
				index ++;
			}
		});
	});
	return index;
};

module.exports = Sorter;
module.exports.indexOf = indexOfChallenge;
