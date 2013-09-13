var request 		= require('request');
var url 			= require('url');
var withAttribute 	= require('./utils/array.matchers');
var extract 		= require('./utils/array.utils');
var httperror 		= require('./utils/http.errors.utils');
var thisPlayer 		= require('./utils/player.utils');
var logSuccess 		= require('./log.success');
var logPlayerServer = require('./log.player.server');

var responseCount;
var output;

maybeClose = function(response, result) {
	responseCount --;
	output.push(result);
	if (responseCount == 0) {
		response.write(JSON.stringify(output))
		response.end();
	}
};

tryChallenge = function(challenge, params, database, response) {
	var player = database.find(params.query.login);
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
					logPlayerServer({login: params.query.login, server: params.query.server}, database);
				}
				if (! thisPlayer.hasTheGivenChallengeInPortfolio(challenge.title, player)) {
					logSuccess({login: params.query.login, challenge: challenge}, database);
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

tryAllChallengesUntilGivenChallenge = function(incoming, response, database) {
	output = [];
	var params = url.parse(incoming.url, true);
	
	var player = database.find(params.query.login);
	if (player == undefined || player.portfolio == undefined || player.portfolio.length == 0) {
		var challengeCount = 1;
	} else {
		var challengeCount = player.portfolio.length + 1;
	}
	
	responseCount = challengeCount;
	for(var i=0; i< challengeCount; i++) {
		var challenge = database.challenges[i];
		
		tryChallenge(challenge, params, database, response);		
	}	
};

module.exports = tryAllChallengesUntilGivenChallenge;

