var fs 		  = require('fs');
var cheerio   = require('cheerio');
var thePlayer = require('./utils/player.utils');

require('./utils/string-extensions');
var progressOf = require('./progress');

dashboard = function(request, response, database) {
	var html = fs.readFileSync('./public/dashboard.html').toString();

	var player = database == undefined ? undefined : database.find(request.url.lastSegment());
	if (player != undefined) {
		html = html.hide('#info').show('#player')
				   .replace('avatar-of-player', player.avatar)
				   .replace('login-of-player', player.login);
		
		if (database.challenges != undefined)
		{
			html = html.show('#achievements');				
			var achievement_template = cheerio.load(html)('#achievements').html();
			var achievements = '';
			for(var index=0; index<database.challenges.length; index++) {
				var star = '<img class="img-responsive" width="23" height="23" src="/img/star-undone.png">';
				if (!thePlayer.isANew(player) && index < (player.portfolio.length)) {
					star = star.replace('undone', 'done');
				}
				achievements += achievement_template.replace('id="achievement_n"></', 'id="achievement_' + (index+1) + '">' + star + '</');
			}
			html = html.replace(achievement_template, achievements);
			
			var challenge = database.challenges[0];
			if (!thePlayer.isANew(player)) {
				html = html.show('#server-of-player');
				html = html.replace('id="server-of-player">server</', 'id="server-of-player">' + player.server + '</');				
				html = html.show('#start-over');
				challenge = database.challenges[player.portfolio.length];				
			}
			
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
}

module.exports = dashboard;