var fs 		  = require('fs');
var cheerio   = require('cheerio');
var thePlayer = require('./utils/player.utils');

require('./utils/string-extensions');
var progressOf = require('./progress');

togglePlayerSection = function(html, player) {
	return html.hide('#info').show('#player')
			   .replace('avatar-of-player', player.avatar)
			   .replace('login-of-player', player.login);
};

buildAchivementList = function(template, player, database) {
	var achievements = '';
	for(var index=0; index<database.challenges.length; index++) {
		var star = '<img class="img-responsive" width="23" height="23" src="/img/star-undone.png">';
		if (!thePlayer.isANew(player) && index < (player.portfolio.length)) {
			star = star.replace('undone', 'done');
		}
		achievements += template.replace('id="achievement_n"></', 'id="achievement_' + (index+1) + '">' + star + '</');
	}
	return achievements;
};

showAchievements = function(html, player, database) {
	html = html.show('#achievements');				
	var achievement_template = cheerio.load(html).html('#achievement_n');
	var achievements = buildAchivementList(achievement_template, player, database);
	return html.replace(achievement_template, achievements);
};

showPlayersServer = function(html, player) {
	html = html.show('#server-of-player');
	html = html.replace('id="server-of-player">server</', 'id="server-of-player">' + player.server + '</');				
	return html.show('#start-over');
};

nextChallenge = function(player, database) {
	var challenge = database.challenges[0];
	if (!thePlayer.isANew(player)) {
		challenge = database.challenges[player.portfolio.length];
	}
	return challenge;
};

dashboard = function(request, response, database) {
	var html = fs.readFileSync('./public/dashboard.html').toString();

	if (database == undefined || request.url == undefined) {
		response.write(html);
		response.end();
		return;
	}
	database.find(request.url.lastSegment(), function(player) {
		if (player != undefined) {
			html = togglePlayerSection(html, player);

			if (database.challenges != undefined)
			{
				html = showAchievements(html, player, database);

				if (!thePlayer.isANew(player)) {
					html = showPlayersServer(html, player);
				}

				var challenge = nextChallenge(player, database);
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
		}
		response.write(html);
		response.end();
	});
}

module.exports = dashboard;