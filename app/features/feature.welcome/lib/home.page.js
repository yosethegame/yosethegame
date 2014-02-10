var fs          = require('fs');
var cheerio     = require('cheerio');
var array       = require('../../../utils/lib/array.utils');
var thePlayer   = require('../../../lib/player.utils');
var renderScore	= require('../../common/lib/render.score');

var extractPlayerTemplateIn = function(page) {
	return page.html('#players .player');
};

var buildLine = function(template, player, database) {
    var serverOfPlayer = thePlayer.hasServer(player) ? thePlayer.serverOf(player) : "";
	var line = template.replace('<a href="">', '<a href="' + serverOfPlayer + '">')
                       .replace('<img src=""', '<img src="' + player.avatar + '"')
                       .replace('1234567', renderScore.withoutLeadingZeros(player.score))
                       .replace('0000', renderScore.leadingZeros(player.score))
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
	var html = fs.readFileSync('./app/features/feature.welcome/lib/index.html').toString();

	var page = cheerio.load(html);
	database.allPlayers(function(players) {
		html = insertPlayerList(page, players, database);
		database.playerCount(function(count) {
            html = html.replace('id="player-count">&nbsp;4</', 'id="player-count">&nbsp;' + count + '</');
            database.getScoreCommunity(function(score) {
                html = html.replace('id="score-community">000040</', 'id="score-community">' + renderScore(score) + '</');
                response.write(html);
                response.end();		
            });
		});
	});
};

module.exports = index;
module.exports.extractPlayerTemplateIn = extractPlayerTemplateIn;
module.exports.buildPlayerList = buildPlayerList;
module.exports.insertPlayerList = insertPlayerList;
module.exports.buildLine = buildLine;
