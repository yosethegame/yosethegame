var fs 		= require('fs');
var cheerio = require('cheerio');

String.prototype.hide = function(selector) {
	var page = cheerio.load(this);
	var before = page(selector);
	var after = page(selector).addClass('hidden').removeClass('visible');
	return page('html').toString().replace(before, after);
}

String.prototype.show = function(selector) {
	var page = cheerio.load(this);
	var before = page(selector);
	var after = page(selector).addClass('visible').removeClass('hidden');
	return page('html').toString().replace(before, after);
}

dashboard = function(request, response, repository) {
	var html = fs.readFileSync('./public/dashboard.html').toString();

	var player = repository == undefined ? undefined : repository.find();
	if (player != undefined) {
		html = html.replace('avatar-of-player', player.avatar);
		html = html.hide('#info').show('#player');		
	}
	response.write(html);
	response.end();
}

module.exports = dashboard;