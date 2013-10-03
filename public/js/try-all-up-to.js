var request 		= require('request');
var url 			= require('url');
var withAttribute 	= require('./utils/array.matchers');
var extract 		= require('./utils/array.utils');
var array 			= require('./utils/array.utils');
var httperror 		= require('./utils/http.errors.utils');
var thisPlayer 		= require('./utils/player.utils');
var logSuccessInPlayer 	= require('./log.success');
var Sorter			= require('./utils/challenges.utils');

var responseCount;
var output;
var challengesToTry;

var sortOutput = function(results, database) {
	var items = [];
	array.forEach(results, function(result) {
		items.push({
			item: result,
			database: database
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


var allChallengesToTry = function(player, database) {
	var challengesToTry = [];

	array.forEach(database.levels, function(level) {
		array.forEach(level.challenges, function(challenge) {
			if (thisPlayer.hasTheGivenChallengeInPortfolio(challenge.title, player)) {
				challengesToTry.push(challenge);
			}
		});
	})
	var level = thisPlayer.currentLevel(player, database);
	challengesToTry.push(array.firstItemIn(level.challenges, function(challenge) {
		return !thisPlayer.hasTheGivenChallengeInPortfolio(challenge.title, player);
	}));
	return challengesToTry;
};

var tryChallengeAtIndex = function(index, params, player, database, response, callback) {
	var challenge = challengesToTry[index];
	var Requester = require(challenge.requester);
	if (player != undefined && player.server != undefined) {
		var requester = new Requester(player.server);
	} else {
		var requester = new Requester(params.query.server);
	}	
	var requestSent = requester.url();
	if (requestSent == undefined) requestSent = '';

	request(requestSent, function(error, remoteResponse, content) {
		var checker = require(challenge.checker);
		checker.validate(requestSent, remoteResponse, content, function(status) {
			if (error != null) {
				status.code = 404,
				status.got = 'undefined'
			}
			if (status.code == 200) {
				if (player.server == undefined) {
					player.server = params.query.server;
				}
			}
			output.push({
				challenge: challenge.title,
				code: status.code,
				expected: status.expected,
				got: status.got
			});
			if (index < challengesToTry.length-1) {
				tryChallengeAtIndex(index + 1, params, player, database, response, callback);
			}
			else {
				var fail = false;
				array.forEach(output, function(item) {
					if (item.code != 200) {
						fail = true;
					}
				});
				if (!fail) {
					var challengeToSave = undefined;
					array.forEach(output, function(item) {
						if (! thisPlayer.hasTheGivenChallengeInPortfolio(item.challenge, player)) {
							challengeToSave = item.challenge;
						}				
					});
					logSuccessInPlayer(player, challengeToSave);
				}
				database.savePlayer(player, function() {
					callback();
				});
			}
		});
	});
};

var tryAllChallengesUntilGivenChallenge = function(incoming, response, database) {
	output = [];
	challengesToTry = [];
	var params = url.parse(incoming.url, true);	
	database.find(params.query.login, function(player) {
		challengesToTry = allChallengesToTry(player, database);
		responseCount = challengesToTry.length;
		tryChallengeAtIndex(0, params, player, database, response, function() {
			response.write(JSON.stringify(
					{
						score: player.score == undefined ? 0 : player.score,
						results: sortOutput(output, database)						
					}
				));
			response.end();			
		});
	});
};

module.exports = tryAllChallengesUntilGivenChallenge;
module.exports.allChallengesToTry = allChallengesToTry;
module.exports.sortOutput = sortOutput;

