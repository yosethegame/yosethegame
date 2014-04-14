var thePlayer = require('../../../lib/player.utils');
var array = require('../../../utils/lib/array.utils');

logSuccess = function(player, levelId, database) {
	if (thePlayer.isANew(player)) {
		player.portfolio = player.portfolio || [];
		player.portfolio[0] = player.portfolio[0] || {} ;
		player.portfolio[0].achievements = player.portfolio[0].achievements || [] ;
	}		
	player.portfolio[0].achievements.push(levelId);
	if (player.score === undefined) player.score = 0;
	player.score += 10;
	
	var title = '';
	array.forEach(database.worlds, function(world) {
	    array.forEach(world.levels, function(level) {
	        if(level.id == levelId) {
	            title = level.title;
	        }
	    });
	});
	database.addNews({ url: player.portfolio[0].server, image: player.avatar, text: 'passed level "' + title + '"' }, function() {});
};

var module = module || {};
module.exports = logSuccess;