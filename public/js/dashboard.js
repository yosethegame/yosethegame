var fs 		= require('fs');

require('./string-extensions');

dashboard = function(request, response, database) {
	var html = fs.readFileSync('./public/dashboard.html').toString();

	var player = database == undefined ? undefined : database.find(request.url.lastSegment());
	if (player != undefined) {
		html = html.replace('avatar-of-player', player.avatar);
		html = html.hide('#info').show('#player');		
		
		var challenge = database.challenges[0];
		if (player.portfolio != undefined) {
			var index = 0;
			while(player.portfolio[index] && player.portfolio[index].title == database.challenges[index].title) { index ++ }
			challenge = database.challenges[index];
		}
		html = html.replace('Next challenge title', challenge.title);
	}
	response.write(html);
	response.end();
}

module.exports = dashboard;