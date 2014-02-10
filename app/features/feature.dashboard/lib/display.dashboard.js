var fs          = require('fs');
var cheerio		= require('cheerio');
var thePlayer	= require('../../../lib/player.utils');
var array		= require('../../../utils/lib/array.utils');
var withValue	= require('../../../utils/lib/array.matchers');
var renderScore	= require('../../common/lib/render.score');

var fillBannerWithGreetings = require('../../common/lib/banner');
var showServerOfPlayer      = require('../../common/lib/show.server.of.player');
var exitWithMessage         = require('../../common/lib/exit.with.message');

var displayWorld = function(page, player, world, worldNumber) {
	var worldSelector = 'table#worlds > tr:nth-child(' + worldNumber + ')';
	var wordLevelsSelector = worldSelector + ' > td:nth-child(2) ul.levels';
	var lockedLevelTemplate = page(wordLevelsSelector + ' li.locked-level').html();
	
	page(worldSelector+ ' > td:nth-child(1)').text(world.name);								
	page(wordLevelsSelector).empty();				
	var challengesDoneInThisWorld = 0;
	var challengesDisplayedInThisWorld = 0;
	array.forEach(world.levels, function(level, levelIndex) {
		var levelNumber = levelIndex + 1;
		var levelMention = '';
		if (thePlayer.hasDoneThisLevel(player, level)) {
			challengesDoneInThisWorld ++;
			levelMention = 'level ' + worldNumber + '.' + levelNumber + ' : ' + level.title;
        }
        else {
            if (level.isOpenLevelFor(player)) {
                levelMention = '<a href="/players/' + player.login + '/play/world/' + worldNumber + '/level/' + levelNumber + '">level ' + worldNumber + '.' + levelNumber + ' : ' + level.title + '</a>';
            }
        }
        if (levelMention !== '') { 
            page(wordLevelsSelector).append('<li>' + levelMention + '</li>'); 
            challengesDisplayedInThisWorld ++;
        }
	});
	
    if (challengesDisplayedInThisWorld < world.levels.length) {
        var lockerMention = lockedLevelTemplate.replace('w.l', worldNumber + '.' + (challengesDisplayedInThisWorld + 1));
        page(wordLevelsSelector).append('<li>' + lockerMention + '</li>');
    }

    page('a.rerun-world-n-link').removeClass('rerun-world-n-link').addClass('rerun-world-'+ worldNumber +'-link');
    if (challengesDoneInThisWorld == world.levels.length) {
        page('a.rerun-world-'+ worldNumber +'-link').removeClass('hidden').addClass('visible')
            .attr('href', '/players/' + player.login + '/rerun/world/' + worldNumber);
    }

	var progress = 100 * challengesDoneInThisWorld / world.levels.length;
	page(worldSelector + ' td:nth-child(2) .progress-bar').attr('style', 'width:' + Math.round(progress) + '%');
	
	page('#restart-world-n-link').attr('id', 'restart-world-' + worldNumber + '-link');
    if (challengesDoneInThisWorld === 0 || worldNumber === 1) {
        page('#restart-world-' + worldNumber + '-link').removeClass('visible').addClass('hidden');
	}
	else {
        page('#restart-world-' + worldNumber + '-link').attr('href', '/players/' + player.login + '/restart/world/' + worldNumber);
	}
};

dashboard = function(request, response, database) {
	var login = /^\/players\/(.*)$/.exec(request.url)[1];
	var html = fs.readFileSync('./app/features/feature.dashboard/lib/dashboard.html').toString();
	var banner = cheerio.load(fs.readFileSync('./app/features/common/lib/banner.html').toString())('#sidebar').html();
	var page = cheerio.load(html);
	page('#sidebar').empty().append(banner);

	database.find(login, function(player) {
		if (player === undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}
		page('#login').text(player.login);		
		fillBannerWithGreetings(page, player, 'Welcome ' + player.login);
		showServerOfPlayer(page, player);
		if (thePlayer.hasServer(player)) {
            page('#restart-game-link').addClass('visible').removeClass('hidden');
        }

		var openWorldTemplate = page.html('table#worlds tr.open-world');
		var lockedWorldTemplate = page.html('table#worlds tr.locked-world');
		
		page('table#worlds').empty();
		var allWorldsAreOpen = true;		
		array.forEach(database.worlds, function(world, worldIndex) {
			if (world.isOpenFor(player)) {
				page('table#worlds').append(openWorldTemplate);
				displayWorld(page, player, world, worldIndex + 1);
			} else {
				var lockerWithWorldName = lockedWorldTemplate.replace('name', world.name);
				page('table#worlds').append(lockerWithWorldName);
				allWorldsAreOpen = false;
			}
		});

		response.write(page.html());
		response.end();
	});
};

module.exports = dashboard;