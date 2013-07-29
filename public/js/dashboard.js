var fs 		= require('fs');

require('./string-extensions');

dashboard = function(request, response, repository) {
	var html = fs.readFileSync('./public/dashboard.html').toString();

	var player = repository == undefined ? undefined : repository.find(request.url.lastSegment());
	if (player != undefined) {
		html = html.replace('avatar-of-player', player.avatar);
		html = html.hide('#info').show('#player');		
	}
	response.write(html);
	response.end();
}

module.exports = dashboard;