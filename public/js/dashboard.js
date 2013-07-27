var fs 		= require('fs');
var cheerio = require('cheerio');

Dashboard = function(login) {
	this.login = login;
}

Dashboard.prototype.useRepository = function(repository) {
	this.player = repository.find({ login: this.login });
}

Dashboard.prototype.display = function(request, response) {
	response.write(this.html());
	response.end();
}

String.prototype.hide = function(selector) {
	var page = cheerio.load(this);
	var before = page(selector);
	var after = page(selector).addClass('hidden').removeClass('visible');
	return page('html').toString().replace(before, after);
}

Dashboard.prototype.html = function() {
	var html = fs.readFileSync('./public/dashboard.html').toString();
	if (this.player != undefined) {
		html = html.replace('avatar-of-player', this.player.avatar);
		html = html.hide('#info');			
	}
	return html;
}

module.exports = Dashboard;