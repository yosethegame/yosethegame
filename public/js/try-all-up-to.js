var request 		= require('request');
var url 			= require('url');
var withAttribute 	= require('./utils/array.matchers');
var extract 		= require('./utils/array.utils');
var httperror 		= require('./utils/http.errors.utils');
var logSuccess 		= require('./log.success');
var logPlayerServer = require('./log.player.server');

tryAllChallengesUntilGivenChallenge = function(incoming, response, database) {
	var params = url.parse(incoming.url, true);
	var player = database.find(params.query.login);
	var challenge = extract.firstItemIn(database.challenges, withAttribute.fileEqualsTo(params.query.challenge));
	var Requester = require(challenge.requester);
	if (player != undefined && player.server != undefined) {
		var requester = new Requester(player.server);
	} else {
		var requester = new Requester(params.query.server);
	}	
	var requestSent = requester.url();
	
	request(requestSent, function(error, remoteResponse, content) {
		var checker = require(challenge.checker);
		var status = checker.validate(requestSent, remoteResponse, content);
		if (error != null) {
			status.code = 404,
			status.got = 'undefined'
		}
		if (status.code == 200) {
			if (player.server == undefined) {
				logPlayerServer({login: params.query.login, server: params.query.server}, database);
			}
			logSuccess({login: params.query.login, challenge: challenge}, database);
		}
		response.write(JSON.stringify([{
			challenge: challenge.title,
			code: status.code,
			expected: status.expected,
			got: status.got
		}]));
		response.end();
	});
};

module.exports = tryAllChallengesUntilGivenChallenge;