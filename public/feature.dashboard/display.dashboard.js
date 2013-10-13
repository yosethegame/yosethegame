var fs 			= require('fs');
var cheerio		= require('cheerio');
var thePlayer	= require('../js/utils/player.utils');
var array		= require('../js/utils/array.utils');
var withValue	= require('../js/utils/array.matchers');
var renderScore	= require('../js/utils/render.score');

require('../js/utils/string-extensions');

dashboard = function(request, response, database) {
	var login = request.url.lastSegment();
	var html = fs.readFileSync('./public/feature.dashboard/dashboard.html').toString();
	var page = cheerio.load(html);

	database.find(login, function(player) {

		if (player == undefined) {
			page('#info').addClass('visible').removeClass('hidden');
			page('#player').addClass('hidden').removeClass('visible');
			response.write(page.html());
			response.end();
			return;
		}

		page('#score').text(renderScore(player.score));

		if (!thePlayer.isANew(player)) {
			page('#server-of-player').addClass('visible').removeClass('hidden')
									 .empty().append(player.server);
			page('#restart-game-link').addClass('visible').removeClass('hidden');
		}
		
		var openWorldTemplate = page.html('table#worlds tr.open-world');
		var lockedWorldTemplate = page.html('table#worlds tr.locked-world');
		page('table#worlds').empty();
		
		var worldNumber = 0;
		array.forEach(database.worlds, function(world) {
			worldNumber ++;
			
			if (world.isOpenFor(player)) {
				page('table#worlds').append(openWorldTemplate);

				var worldSelector = 'table#worlds tr:nth-child(' + worldNumber + ')';
				page(worldSelector+ ' td:nth-child(1)').text(world.name);
				var levelNumber = 0;
				var wordLevelsSelector = worldSelector + ' td:nth-child(2) ul.levels';
				page(wordLevelsSelector).empty();
				var nextChallengeOfWorldDisplayed = false;
				var challengesDoneInThisWorld = 0
				array.forEach(world.levels, function(level) {
					levelNumber ++;
					if (!thePlayer.isANew(player) && array.hasOneItemIn(player.portfolio, withValue.equalsTo(level.id))) {
						challengesDoneInThisWorld ++;
						var levelMention = 'level ' + worldNumber + '.' + levelNumber + ' : ' + level.title;
					} else {
						if (! nextChallengeOfWorldDisplayed ) {
							var levelMention = '<a href="/players/' + login + '/play/world/' + worldNumber + '">level ' + worldNumber + '.' + levelNumber + ' : ' + level.title + '</a>';
							nextChallengeOfWorldDisplayed = true;
						} else {
							var levelMention = '<img src="/img/locker.png" width="60" height="60" class="img-responsive">';
						}
					}
					page(wordLevelsSelector).append('<li>' + levelMention + '</li>');			
				});
				var progress = 100 * challengesDoneInThisWorld / world.levels.length;
				page(worldSelector + ' td:nth-child(2) .progress-bar').attr('style', 'width:' + Math.round(progress) + '%')
			} else {
				page('table#worlds').append(lockedWorldTemplate);
			}
			
		});

		response.write(page.html());
		response.end();

	});
	
}

module.exports = dashboard;