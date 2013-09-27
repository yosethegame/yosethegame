var fs 		= require('fs');
var cheerio = require('cheerio');
var array	= require('./utils/array.utils');

var extractPlayerTemplateIn = function(page) {
	return page.html('#players .player');
};

var buildPlayerList = function(page, database, callback) {
	var template = extractPlayerTemplateIn(page);
	database.allPlayers(function(players) {
		var list = '';
		array.forEach(players, function(player) {
			list += template.replace('<img src=""', '<img src="' + player.avatar + '"');
		});
		callback(list);
	});
};

var index = function(request, response, database) {
	var html = fs.readFileSync('./public/index.html').toString();

	var page = cheerio.load(html);
	buildPlayerList(page, database, function(list) {
		html = html.replace(extractPlayerTemplateIn(page), list);

		response.write(html);
		response.end();		
	});
}

module.exports = index;
module.exports.extractPlayerTemplateIn = extractPlayerTemplateIn;
module.exports.buildPlayerList = buildPlayerList;