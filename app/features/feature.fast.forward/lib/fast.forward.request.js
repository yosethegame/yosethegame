var tryRequest = require('../../feature.try/lib/try.request');
var logSuccess = require('../../feature.try/lib/log.success');
var array = require('../../../utils/lib/array.utils');
var thisPlayer = require('../../../lib/player.utils');

var fastforward = function(request, response, database, done) {
    
    var login = /^\/players\/(.*)\/fastforward/.exec(request.url)[1];
    var worldNumber = parseInt(/^\/players\/(.*)\/fastforward\/world\/(.*)/.exec(request.url)[2]);
    var world = database.worlds[worldNumber - 1];
    
    database.find(login, function(player) {

        tryRequest.tryLevelsStartingAtIndex(0, world.levels, {}, player, database, [], function(output) {
            var stopHere = false;
            array.forEach(output, function(result) {
                if (!stopHere && result.code === 200 && ! thisPlayer.hasDoneThisLevel(player, result)) {
                    logSuccess(player, result.id);
                }
                if (result.code !== 200) { stopHere = true; }
            });
            response.end();

            if (done !== undefined) {
                done();
            }
        });        
    });
    
};

module.exports = fastforward;
