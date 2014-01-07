var array       = require('../js/utils/array.utils');
var thePlayer   = require('../js/utils/player.utils');

var urlPattern = /^\/players\/(.*)\/restart\/world\/(.*)/;

var extractLogin = function(request) {
    return urlPattern.exec(request.url)[1];
};

var extractWorldNumber = function(request) {
    return parseInt(urlPattern.exec(request.url)[2]);
};

var removeAchievementsOfWorld = function(login, database, world, callback) {
    if (world === undefined || world == database.worlds[0]) {
        callback();
    } else {
        database.find(login, function(player) {
            if (player !== undefined) {
                array.forEach(world.levels, function(level) {
                    if (thePlayer.hasDoneThisLevel(player, level)) {
                        player.score -= 10;
                        player.portfolio[0].achievements = array.remove(level.id, player.portfolio[0].achievements);
                    }
                });
                database.savePlayer(player, function() {
                    callback();
                });
            } else {
                callback();
            }
        });
    }
};

restartworld = function(request, response, database) {
    var login = extractLogin(request);
	var world = database.worlds[extractWorldNumber(request) - 1];
	
    removeAchievementsOfWorld(login, database, world, function() {
        response.writeHead(302, { 'location': '/players/' + login });
        response.end(); 
    });
};

module.exports = restartworld;
module.exports.extractLogin = extractLogin;
module.exports.extractWorldNumber = extractWorldNumber;
