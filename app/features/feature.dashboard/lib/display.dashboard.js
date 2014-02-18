var fs          = require('fs');
var cheerio		= require('cheerio');
var thePlayer	= require('../../../lib/player.utils');
var array		= require('../../../utils/lib/array.utils');
var withValue	= require('../../../utils/lib/array.matchers');
var renderScore	= require('../../common/lib/render.score');

var fillBannerWithGreetings = require('../../common/lib/banner');
var showServerOfPlayer      = require('../../common/lib/show.server.of.player');
var exitWithMessage         = require('../../common/lib/exit.with.message');

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

		array.forEach(database.worlds, function(world, worldIndex) {
            var ellipse = page('#world-' + (worldIndex+1) + ' .world-ellipse');
            var worldDetail = page('#world-' + (worldIndex+1) + ' .world-detail');
            if (world.isOpenFor(player)) {
                ellipse.addClass('world-open');
                worldDetail.addClass('visible');
                var levelList = page('#world-' + (worldIndex+1) + ' .level-list');
                var drawLockedLevel = false;
                var levelDoneCount = 0;
                array.forEach(world.levels, function(level, levelIndex) {
                    if (thePlayer.hasDoneThisLevel(player, level)) {
                        levelList.append('<li class="level level-done">' + level.title + '</li>');
                        levelDoneCount ++;
                    }
                    else {
                        if (level.isOpenLevelFor(player)) {
                            var link = '<a href="/players/' + login + '/play/world/' + (worldIndex+1) + '/level/' + (levelIndex+1) + '">' + level.title + '</a>';
                            levelList.append('<li class="level level-open">' + link + '</li>');
                        }
                        else {
                            drawLockedLevel = true;
                        }
                    }
                });
                if (drawLockedLevel) {
                    levelList.append('<li class="level level-locked">Locked</li>');
                }
                if (levelDoneCount > 0) {
                    page('#restart-world-' + (worldIndex+1) + '-link').removeClass('hidden').addClass('visible');
                    page('#restart-world-' + (worldIndex+1) + '-link').attr('href', '/players/' + login + '/restart/world/' + (worldIndex+1));
                }
                if (levelDoneCount == world.levels.length) {
                    page('#rerun-world-' + (worldIndex+1) + '-link').removeClass('hidden').addClass('visible');
                    page('#rerun-world-' + (worldIndex+1) + '-link').attr('href', '/players/' + login + '/rerun/world/' + (worldIndex+1));
                }
            } else {
                ellipse.addClass('world-locked');
                worldDetail.addClass('hidden');
            }
		});

		response.write(page.html());
		response.end();
	});
};

module.exports = dashboard;