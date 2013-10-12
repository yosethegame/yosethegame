var fs 				= require('fs');
var cheerio			= require('cheerio');
var thePlayer		= require('../js/utils/player.utils');
var array			= require('../js/utils/array.utils');
var withValue		= require('../js/utils/array.matchers');

require('../js/utils/string-extensions');

dashboard = function(request, response, database) {
	var login = request.url.lastSegment();
	var html = fs.readFileSync('./public/feature.dashboard/dashboard.html').toString();
	var page = cheerio.load(html);

	database.find(login, function(player) {

		if (!thePlayer.isANew(player)) {
			page('#server-of-player').addClass('visible').removeClass('hidden')
									 .empty().append(player.server);
		}
		
		var world1 = 'table#worlds tr:nth-child(1) td:nth-child(1)';
		page(world1).text(database.worlds[0].name);

		var world = database.worlds[0];
		var levelNumber = 0;
		var wordLevelsSelector = 'table#worlds tr:nth-child(1) td:nth-child(2) ul.levels';
		page(wordLevelsSelector).empty();
		var nextChallengeOfWorldDisplayed = false;
		array.forEach(world.levels, function(level) {
			levelNumber ++;
			if (!thePlayer.isANew(player) && array.hasOneItemIn(player.portfolio, withValue.equalsTo(level.id))) {
				var levelMention = 'level 1.' + levelNumber + ' : ' + level.title;
			} else {
				if (! nextChallengeOfWorldDisplayed ) {
					var levelMention = '<a href="/players/' + login + '/play/world/1">level 1.' + levelNumber + ' : ' + level.title + '</a>';
					nextChallengeOfWorldDisplayed = true;
				} else {
					var levelMention = '<img src="/img/locker.png" width="60" height="60" class="img-responsive">';
				}
			}
			page(wordLevelsSelector).append('<li>' + levelMention + '</li>');
			
		});

		response.write(page.html());
		response.end();

	});
	
}

module.exports = dashboard;