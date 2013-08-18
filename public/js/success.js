var qs = require('querystring');

findChallengeTitle = function(challengeFile, database) {
	for(var i=0; i<database.challenges.length; i++) {
		if (database.challenges[i].file == challengeFile) {
			return database.challenges[i].title;
		}
	}
};

success = function(request, response, database) {
	console.log('\nreceiving success request from host ' + request.headers.host);
	
	if (request.method != 'POST') {
		response.writeHead(405);
		response.end();
	} else {
		var body = '';
	    request.on('data', function (data) {
	        body += data;
	    });
	    request.on('end', function () {
			var form = qs.parse(body);
			
			if (form.login == undefined || form.challenge == undefined || form.server == undefined) {
				response.writeHead(400);
				response.end();
				return;
			}
			
			var player = database.find(form.login);
			
			if (player.portfolio == undefined) {
				player.portfolio = [];
			}
			
			player.portfolio.push( 
				{ 
					title: findChallengeTitle(form.challenge, database),
					server: form.server 
				} 
			);
			database.savePlayer(player);
			response.end();
	    });
	}
};

module.exports = success;