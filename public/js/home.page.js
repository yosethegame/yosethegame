var fs 			= require('fs');
var cheerio 	= require('cheerio');
var array		= require('./utils/array.utils');
var thePlayer 	= require('./utils/player.utils');
var renderScore	= require('./utils/render.score');

var extractPlayerTemplateIn = function(page) {
	return page.html('#players .player');
};

var buildLine = function(template, player, database) {
	var level = thePlayer.currentLevel(player, database);
	var stars = '';
	array.forEach(level.challenges, function(challenge) {
		var star = '<img class="img-responsive" width="23" height="23" src="/img/star-undone.png">';
		if (thePlayer.hasTheGivenChallengeInPortfolio(challenge.title, player)) {
			star = star.replace('undone', 'done');
		}
		stars += '<li>' + star + '</li>';
	});
	var line = template.replace('<img src=""', '<img src="' + player.avatar + '"')
				   	   .replace('class="level">Level<', 'class="level">Level ' + level.number + ' : ' + level.name + '<')
					   .replace('<li><img src="star"></li>', stars)
					   .replace('1234567', renderScore(player.score))
				;
	return line;
};

var buildPlayerList = function(page, players, database) {
	var template = extractPlayerTemplateIn(page);
	var list = '';
	array.forEach(players, function(player) {
		list += buildLine(template, player, database);
	});
	return list;
};

var insertPlayerList = function(page, players, database) {
	var list = buildPlayerList(page, players, database);
	var template = extractPlayerTemplateIn(page);
	var html = page.html();
	return html.replace(template, list);
};

var index = function(request, response, database) {
	var html = fs.readFileSync('./public/index.html').toString();

	var page = cheerio.load(html);
	database.allPlayers(function(players) {
		html = insertPlayerList(page, players, database);
		response.write(html);
		response.end();		
	});
}

module.exports = index;
module.exports.extractPlayerTemplateIn = extractPlayerTemplateIn;
module.exports.buildPlayerList = buildPlayerList;
module.exports.insertPlayerList = insertPlayerList;
module.exports.buildLine = buildLine;
