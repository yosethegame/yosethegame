var request         = require('request');
var url             = require('url');
var withAttribute   = require('../js/utils/array.matchers');
var withValue       = require('../js/utils/array.matchers');
var extract         = require('../js/utils/array.utils');
var array           = require('../js/utils/array.utils');
var httperror       = require('../js/utils/http.errors.utils');
var thisPlayer      = require('../js/utils/player.utils');
var Sorter          = require('./challenges.sorter');
var logSuccess      = require('./log.success');
var logServer       = require('../levels.common/log.server');

var sortOutput = function(results, world) {
	var items = [];
	array.forEach(results, function(result) {
		items.push({
			item: result,
			world: world
		});
	});
	var sorter = new Sorter();	
	items.sort(sorter.sort);
	var sorted = [];
	array.forEach(items, function(item) {
		sorted.push(item.item);
	});
	return sorted;
};

var allLevelsToTry = function(player, world) {
	if (thisPlayer.isANew(player)) { return [world.levels[0]]; }
	var levelsToTry = [];
	var nextLevelFound = false;
	array.forEach(world.levels, function(level) {
		if (thisPlayer.hasDoneThisLevel(player, level)) {
			levelsToTry.push(level);
		} else {
			if (! nextLevelFound ) {
				levelsToTry.push(level);
			}
			nextLevelFound = true;
		}
	});
	return levelsToTry;
};

var tryLevelsStartingAtIndex = function(index, levelsToTry, params, player, database, response, output, callback) {
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
				status.got = 'undefined';
			}
			output.push({
				id: level.id,
				title: level.title,
				code: status.code,
				expected: status.expected,
				got: status.got
			});
			if (index < levelsToTry.length-1) {
				tryLevelsStartingAtIndex(index + 1, levelsToTry, params, player, database, response, output, callback);
			}
			else {
                callback(output);
			}
		});
	});
};

var tryAllLevelsAndSaveResults = function(levelsToTry, params, player, database, response, callback) {
    tryLevelsStartingAtIndex(0, levelsToTry, params, player, database, response, [], function(output) {
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
		if (!fail) {
			var levelIdToSave;
			if (thisPlayer.isANew(player)) {
				levelIdToSave = output[0].id;
			} else {
				array.forEach(output, function(item) {
					if (! thisPlayer.hasDoneThisLevel(player, item)) {
						levelIdToSave = item.id;
					}				
				});
			}
			logSuccess(player, levelIdToSave);
		}
		database.savePlayer(player, function() {
			callback(output);
		});
    });
};

var tryWorld = function(incoming, response, database) {
	output = [];
	levelsToTry = [];
	var params = url.parse(incoming.url, true);	
	var world = database.worlds[params.query.world - 1];
	database.find(params.query.login, function(player) {
		levelsToTry = allLevelsToTry(player, world);
		tryAllLevelsAndSaveResults(levelsToTry, params, player, database, response, function(output) {
            var jsonResponse = JSON.stringify( { score: player.score === undefined ? 0 : player.score, results: sortOutput(output, world) } );
            response.writeHead(200, { 'Content-Type': 'application/json' } );
			response.write(jsonResponse);
			response.end();			
		});
	});
};

module.exports = tryWorld;
module.exports.allLevelsToTry = allLevelsToTry;
module.exports.sortOutput = sortOutput;
module.exports.tryLevelsStartingAtIndex = tryLevelsStartingAtIndex;

