var fs      = require('fs');
var cheerio	= require('cheerio');

settings = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.settings/settings.form.html').toString();
	var page = cheerio.load(html);
	
	var pattern = /^\/players\/(.*)\/settings$/;
	var login = pattern.exec(request.url)[1];
	database.find(login, function(player) {
    	response.write(page.html());
    	response.end();
	});	
};

module.exports = settings;