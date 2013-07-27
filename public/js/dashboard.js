var fs 		= require('fs');
var cheerio = require('cheerio');

Dashboard = function(login) {
	this.login = login;
}

Dashboard.prototype.useRepository = function(repository) {
	this.repository = repository;
}

Dashboard.prototype.display = function(request, response) {
	response.write(this.html());
	response.end();
}

Dashboard.prototype.html = function() {
	var html = fs.readFileSync('./public/dashboard.html').toString();
	if (this.repository != undefined) {
		var player = this.repository.find({ login: this.login });
		if (player != undefined) {
			html = html.replace('avatar-of-player', player.avatar);
			
			var page = cheerio.load(html);
			var before = page('#info');
			var after = page('#info').addClass('hidden').removeClass('visible');
			html = page('html').toString().replace(before, after);
			
		}
		else {
			var page = cheerio.load(html);
			var before = page('#player');
			var after = page('#player').addClass('hidden').removeClass('visible');
			html = page('html').toString().replace(before, after);
		}
	}
	else {
		var page = cheerio.load(html);
		var before = page('#player');
		var after = page('#player').addClass('hidden').removeClass('visible');
		html = page('html').toString().replace(before, after);
	}
	return html;
}

module.exports = Dashboard;