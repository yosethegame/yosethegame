var url 		= require('url');
var fs 			= require('fs');
var cheerio 	= require('cheerio');

playground = function(request, response, database) {
	var login = /^\/players\/(.*)\/play/.exec(request.url)[1];
	var html = fs.readFileSync('./public/feature.playground/playground.html').toString();
	var page = cheerio.load(html);
	
	database.find(login, function(player) {

		if (player == undefined) {
			page('#info').addClass('visible').removeClass('hidden');
			page('#player').addClass('hidden').removeClass('visible');
			response.write(page.html());
			response.end();
			return;
		}
		
		page("#avatar").attr('src', player.avatar);

		response.write(page.html());
		response.end();
	});
	
}

module.exports = playground;