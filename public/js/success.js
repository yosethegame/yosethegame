var qs = require('querystring');

findChallengeTitle = function(challengeFile, database) {
	for(var i=0; i<database.challenges.length; i++) {
		if (database.challenges[i].file == challengeFile) {
			return database.challenges[i].title;
		}
	}
};

success = function(request, response, database) {
	
	if (request.method == 'POST') {
		var body = '';
	    request.on('data', function (data) {
	        body += data;
	    });
	    request.on('end', function () {
			var form = qs.parse(body);
			var player = database.find(form.login);
			player.portfolio = [ 
				{ 
					title: findChallengeTitle(form.challenge, database),
					server: form.server 
				} 
			];
			database.savePlayer(player);
			response.end();
	    });
	} else {
		response.writeHead(405);
		response.end();
	}
};

module.exports = success;