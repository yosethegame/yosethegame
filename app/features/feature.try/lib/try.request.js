var request         = require('request');
var url             = require('url');
var withAttribute   = require('../../../utils/lib/array.matchers');
var withValue       = require('../../../utils/lib/array.matchers');
var extract         = require('../../../utils/lib/array.utils');
var array           = require('../../../utils/lib/array.utils');
var httperror       = require('./http.errors.utils');
var thisPlayer      = require('../../../lib/player.utils');
var logSuccess      = require('./log.success');
var logServer       = require('./log.server');
var news            = require('../../feature.news/lib/news.builder');

var allLevelsToTry = function(player, world, level) {
	var levelsToTry = thisPlayer.doneLevelsInWorld(player, world);
	levelsToTry.push(level);
	return levelsToTry;
};

var tryLevelsStartingAtIndex = function(index, levelsToTry, params, player, database, output, callback) {
	var level = levelsToTry[index];
	var Requester = require(level.requester);
	var requester;
	if (thisPlayer.hasServer(player)) {
		requester = new Requester(thisPlayer.serverOf(player));
	} else {
		requester = new Requester(params.query.server);
	}	
	var requestSent = requester.url();
	if (requestSent === undefined) requestSent = '';

	request(requestSent, function(error, remoteResponse, content) {
		var checker = require(level.checker);
		checker.player = player;
		checker.validate(requestSent, remoteResponse, content, function(status) {
			if (error !== null) {
				status.code = 404;
			}
			output.push({
				id: level.id,
				title: level.title,
				code: status.code,
				expected: status.expected,
				got: status.got
			});
			if (index < levelsToTry.length-1) {
				tryLevelsStartingAtIndex(index + 1, levelsToTry, params, player, database, output, callback);
			}
			else {
                callback(output);
			}
		});
	});
};

var tryAllLevelsAndSaveResults = function(levelsToTry, params, player, database, callback) {
    tryLevelsStartingAtIndex(0, levelsToTry, params, player, database, [], function(output) {
        var fail = false;
        var oneSuccess = false;
		array.forEach(output, function(item) {
			if (item.code != 200) {
				fail = true;
			}
			else {
                oneSuccess = true;
			}
		});
		if (oneSuccess) {
			if (! thisPlayer.hasServer(player)) {
				logServer(player, params.query.server);
            }
		}
		var levelIdToSave;
		if (!fail) {
			if (thisPlayer.isANew(player)) {
				levelIdToSave = output[0].id;
			} else {
				array.forEach(output, function(item) {
					if (! thisPlayer.hasDoneThisLevel(player, item)) {
						levelIdToSave = item.id;
					}				
				});
			}
			logSuccess(player, levelIdToSave, database);
		}
		database.savePlayer(player, function() {
            if (!fail) {
                database.addNews(news.playerPassedLevel(levelIdToSave, player, database), function() {
                    callback(output);
                });
            }
            else {
                callback(output);
            }
		});
    });
};

var tryWorld = function(incoming, response, database) {
	var params = url.parse(incoming.url, true);	
	var world = database.worlds[params.query.world - 1];
	var level = world.levels[params.query.level - 1];
	database.find(params.query.login, function(player) {
		var levelsToTry = allLevelsToTry(player, world, level);
		tryAllLevelsAndSaveResults(levelsToTry, params, player, database, function(output) {
            var jsonResponse = JSON.stringify( { score: player.score === undefined ? 0 : player.score, results: output } );
            response.writeHead(200, { 'Content-Type': 'application/json' } );
			response.write(jsonResponse);
			response.end();			
		});
	});
};

module.exports = tryWorld;
module.exports.allLevelsToTry = allLevelsToTry;
module.exports.tryLevelsStartingAtIndex = tryLevelsStartingAtIndex;

