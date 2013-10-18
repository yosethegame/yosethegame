var fs 			= require('fs');
var cheerio		= require('cheerio');
var thePlayer	= require('../js/utils/player.utils');
var array		= require('../js/utils/array.utils');
var withValue	= require('../js/utils/array.matchers');
var renderScore	= require('../js/utils/render.score');

var fillBanner = function(page, player) {
	page("#avatar").attr('src', player.avatar);
	page('#score').text(renderScore(player.score));
	page('#greetings').text('Welcome home ' + player.login);
	page('#dashboard-link').attr('href', '/players/' + player.login);
};

var exitWithMessage = function(message, page, response) {
	page('#info').addClass('visible').removeClass('hidden');
	page('#info').text(message);
	page('#player').addClass('hidden').removeClass('visible');
	response.write(page.html());
	response.end();
	return;	
};

var displayWorld = function(page, player, world, worldNumber) {
	var worldSelector = 'table#worlds tr:nth-child(' + worldNumber + ')';
	var wordLevelsSelector = worldSelector + ' td:nth-child(2) ul.levels';
	
	page(worldSelector+ ' td:nth-child(1)').text(world.name);								
	page(wordLevelsSelector).empty();				
	var nextChallengeOfWorldDisplayed = false;
	var lockerDisplayed = false;
	var challengesDoneInThisWorld = 0
	array.forEach(world.levels, function(level, levelIndex) {
		if (!lockerDisplayed) {
			var levelNumber = levelIndex + 1;
			if (thePlayer.hasDoneThisLevel(player, level)) {
				challengesDoneInThisWorld ++;
				var levelMention = 'level ' + worldNumber + '.' + levelNumber + ' : ' + level.title;
			} else {
				if (! nextChallengeOfWorldDisplayed ) {
					var levelMention = '<a href="/players/' + player.login + '/play/world/' + worldNumber + '">level ' + worldNumber + '.' + levelNumber + ' : ' + level.title + '</a>';
					nextChallengeOfWorldDisplayed = true;
				} else {
					var levelMention = '<img src="/img/locker.png" width="60" height="60" class="img-responsive">';
					lockerDisplayed = true;
				}
			}
			page(wordLevelsSelector).append('<li>' + levelMention + '</li>');			
		}
	});
	var progress = 100 * challengesDoneInThisWorld / world.levels.length;
	page(worldSelector + ' td:nth-child(2) .progress-bar').attr('style', 'width:' + Math.round(progress) + '%')
};

var showServerOfPlayer = function(page, player) {
	if (thePlayer.hasServer(player)) {
		var serverOfPlayer = thePlayer.serverOf(player);
		page('#server-of-player').addClass('visible').removeClass('hidden').empty().append(serverOfPlayer);
		page('#server-of-player').attr('href', serverOfPlayer);
		page('#restart-game-link').addClass('visible').removeClass('hidden');
	}	
};

dashboard = function(request, response, database) {
	var login = /^\/players\/(.*)$/.exec(request.url)[1];
	var html = fs.readFileSync('./public/feature.dashboard/dashboard.html').toString();
	var page = cheerio.load(html);

	database.find(login, function(player) {
		if (player == undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}
		page('#login').text(player.login);		
		fillBanner(page, player);
		showServerOfPlayer(page, player);

		var openWorldTemplate = page.html('table#worlds tr.open-world');
		var lockedWorldTemplate = page.html('table#worlds tr.locked-world');
		
		page('table#worlds').empty();		
		array.forEach(database.worlds, function(world, worldIndex) {
			if (world.isOpenFor(player)) {
				page('table#worlds').append(openWorldTemplate);
				displayWorld(page, player, world, worldIndex + 1);
			} else {
				page('table#worlds').append(lockedWorldTemplate);
			}			
		});

		response.write(page.html());
		response.end();
	});
}

module.exports = dashboard;