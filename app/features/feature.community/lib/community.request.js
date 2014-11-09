var fs          = require('fs');
var cheerio     = require('cheerio');
var array       = require('../../../utils/lib/array.utils');
var thePlayer   = require('../../../lib/player.utils');
var renderScore	= require('../../common/lib/render.score');

var index = function(request, response, database) {
	var html = fs.readFileSync('./app/features/feature.community/lib/community.html').toString();
	var menu = fs.readFileSync('./app/features/feature.welcome/lib/menu.html').toString();
	html = html.replace('Placeholder for the menu', menu);

	var page = cheerio.load(html);
	database.allPlayers(function(players) {
		html = module.exports.hallOfFame.insertPlayerList(page, players, database);
		database.playerCount(function(count) {
            html = html.replace('id="player-count"> 4</', 'id="player-count"> ' + count + '</');
            database.getScoreCommunity(function(score) {
                html = html.replace('id="score-community">000040</', 'id="score-community">' + renderScore(score) + '</');
                response.write(html);
                response.end();		
            });
		});
	});
};

module.exports = index;
module.exports.hallOfFame = require('./hall.of.fame');
