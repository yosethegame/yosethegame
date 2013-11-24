var fs      = require('fs');
var cheerio	= require('cheerio');

settings = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.settings/settings.form.html').toString();
	var page = cheerio.load(html);
	
	var pattern = /^\/players\/(.*)\/settings$/;
	var login = pattern.exec(request.url)[1];
	database.find(login, function(player) {
        page('input#avatar-url').attr('value', player.avatar);
        page('#avatar-preview').attr('src', player.avatar);
        page('#login').text(player.login);
        page('a#player-dashboard').attr('href', '/players/' + player.login);
        
        response.write(page.html());
        response.end();
	});	
};

module.exports = settings;