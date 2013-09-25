var request 		= require('request');
var url 			= require('url');
var withAttribute 	= require('./utils/array.matchers');
var extract 		= require('./utils/array.utils');
var array 			= require('./utils/array.utils');
var httperror 		= require('./utils/http.errors.utils');
var thisPlayer 		= require('./utils/player.utils');
var logSuccess 		= require('./log.success');
var logPlayerServer = require('./log.player.server');

var responseCount;
var output;

var maybeClose = function(response, result) {
	responseCount --;
	output.push(result);
	if (responseCount == 0) {
		response.write(JSON.stringify(output))
		response.end();
	}
};

var tryChallenge = function(challenge, params, player, database, response) {
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
					logPlayerServer(player, params.query.server, database);
				}
				if (! thisPlayer.hasTheGivenChallengeInPortfolio(challenge.title, player)) {
					logSuccess(player, challenge, database);
				}
			}
			maybeClose(response, {
				challenge: challenge.title,
				code: status.code,
				expected: status.expected,
				got: status.got
			});
		});
	});		
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

var tryAllChallengesUntilGivenChallenge = function(incoming, response, database) {
	output = [];
	var params = url.parse(incoming.url, true);	
	database.find(params.query.login, function(player) {
		var challengesToTry = allChallengesToTry(player, database);
		responseCount = challengesToTry.length;
		array.forEach(challengesToTry, function(challenge) {
			tryChallenge(challenge, params, player, database, response);		
		});	
	});
};

module.exports = tryAllChallengesUntilGivenChallenge;
module.exports.allChallengesToTry = allChallengesToTry;

