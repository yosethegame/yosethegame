var fs 		= require('fs');
var cheerio = require('cheerio');
var array	= require('./utils/array.utils');

var extractPlayerTemplateIn = function(page) {
	return page.html('#players .player');
};

var buildLine = function(template, player) {
	return template.replace('<img src=""', '<img src="' + player.avatar + '"')
				   .replace('class="level">Level<', 'class="level">Level 1<');
};

var buildPlayerList = function(page, players) {
	var template = extractPlayerTemplateIn(page);
	var list = '';
	array.forEach(players, function(player) {
		list += buildLine(template, player);
	});
	return list;
};

var insertPlayerList = function(page, players) {
	var list = buildPlayerList(page, players);
	var template = extractPlayerTemplateIn(page);
	var html = page.html();
	return html.replace(template, list);
};

var index = function(request, response, database) {
	var html = fs.readFileSync('./public/index.html').toString();

	var page = cheerio.load(html);
	database.allPlayers(function(players) {
		html = insertPlayerList(page, players);
		response.write(html);
		response.end();		
	});
}

module.exports = index;
module.exports.extractPlayerTemplateIn = extractPlayerTemplateIn;
module.exports.buildPlayerList = buildPlayerList;
module.exports.insertPlayerList = insertPlayerList;
module.exports.buildLine = buildLine;
