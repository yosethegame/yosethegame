var fs 		  	= require('fs');
var cheerio   	= require('cheerio');
var thePlayer 	= require('./utils/player.utils');
var insert		= require('./utils/level.utils');

require('./utils/string-extensions');

togglePlayerSection = function(html, player) {
	return html.hide('#info').show('#player')
			   .replace('avatar-of-player', player.avatar)
			   .replace('login-of-player', player.login);
};

buildAchivementList = function(template, player, level) {
	var achievements = '';
	for(var index=0; index<level.challenges.length; index++) {
		var star = '<img class="img-responsive" width="23" height="23" src="/img/star-undone.png">';
		if (!thePlayer.isANew(player) && index < (player.portfolio.length)) {
			star = star.replace('undone', 'done');
		}
		achievements += template.replace('id="achievement_n"></', 'id="achievement_' + (index+1) + '">' + star + '</');
	}
	return achievements;
};

showAchievements = function(html, player, level) {
	html = html.show('#achievements');				
	var achievement_template = cheerio.load(html).html('#achievement_n');
	var achievements = buildAchivementList(achievement_template, player, level);
	return html.replace(achievement_template, achievements);
};

showPlayersServer = function(html, player) {
	html = html.show('#server-of-player');
	html = html.replace('id="server-of-player">server</', 'id="server-of-player">' + player.server + '</');				
	return html.show('#start-over');
};

dashboard = function(request, response, database) {
	var html = fs.readFileSync('./public/dashboard.html').toString();

	if (database == undefined || request.url == undefined) {
		response.write(html);
		response.end();
		return;
	}
	var player = database.find(request.url.lastSegment());
	if (player != undefined) {
		html = togglePlayerSection(html, player);
		var level = thePlayer.currentLevel(player, database);
		html = insert.levelIn(html, level);
		html = showAchievements(html, player, level);
		if (!thePlayer.isANew(player)) {
			html = showPlayersServer(html, player);
		}
		var challenge = thePlayer.nextChallengeInLevel(player, level);
		if (challenge != undefined) {
			html = html.replace('Next challenge title', challenge.title);
			if (challenge.file != undefined) {
				var page = cheerio.load(fs.readFileSync(challenge.file).toString());
				html = html.replace('Next challenge content', page('#challenge-content').html());
			}			
		} else {
			html = html.hide('#next-challenge').show('#when-no-more-challenges');
		}
	}
	response.write(html);
	response.end();
}

module.exports = dashboard;