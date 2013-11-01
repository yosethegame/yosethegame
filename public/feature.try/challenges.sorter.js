var array = require('../js/utils/array.utils');

function Sorter() { }

Sorter.prototype.sort = function(a, b) {
	return indexOfLevel(a) - indexOfLevel(b);
};

var indexOfLevel = function(o) {
	var id = o.item.id;
	var world = o.world;
	
	var index = 0;
	var found = false;
	array.forEach(world.levels, function(level) {
		if (level.id == id) {
			found = true;
		}
		if (!found) {
			index ++;
		}
	});
	return index;
};

module.exports = Sorter;
module.exports.indexOf = indexOfLevel;
