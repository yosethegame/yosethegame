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
	var worldTemplate = cheerio.load(fs.readFileSync('./app/features/feature.dashboard/lib/world.html').toString()).html();

	database.find(login, function(player) {
		if (player === undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}
		page('#login').text(player.login);		
		fillBannerWithGreetings(page, player, 'Welcome ' + player.login);

		showServerOfPlayer(page, player);
		if (thePlayer.hasServer(player)) {
            page('#restart-game-link').addClass('visible').removeClass('hidden');
            page('#server-of-player-area').removeClass('hidden').addClass('visible');

            var totalLevelCount = 0;
            array.forEach(database.worlds, function(world) {
                totalLevelCount += world.levels.length;
            });
            var achievementCount = player.portfolio[0].achievements.length;
            var percentage = Math.round(100 * achievementCount / totalLevelCount);
            var style = 'width:' + percentage + '%';
            page('.progress-bar').attr('style', style);
        }
        else {
            page('.progress-bar').attr('style', 'width:0%');
        }

		array.forEach(database.worlds, function(world, worldIndex) {
            page('#world-' + (worldIndex+1)).empty().append(worldTemplate);
            var ellipse = page('#world-' + (worldIndex+1) + ' .world-ellipse');
            page('#world-' + (worldIndex+1) + ' .world-ellipse .world-name').text(world.name);
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
                if (levelDoneCount > 0 && worldIndex !== 0) {
                    page('#world-' + (worldIndex+1) + ' .restart-world-link').removeClass('hidden').addClass('visible');
                    page('#world-' + (worldIndex+1) + ' .restart-world-link').attr('href', '/players/' + login + '/restart/world/' + (worldIndex+1));
                }
                if (levelDoneCount == world.levels.length) {
                    ellipse.removeClass('world-open').addClass('world-completed');
                    page('#world-' + (worldIndex+1) + ' .rerun-world-link').removeClass('hidden').addClass('visible');
                    page('#world-' + (worldIndex+1) + ' .rerun-world-link').attr('href', '/players/' + login + '/rerun/world/' + (worldIndex+1));
                }
                else {
                    page('#world-' + (worldIndex+1) + ' .world-ellipse .glyphicon-ok').remove();
                }
            } else {
                ellipse.addClass('world-locked');
                worldDetail.addClass('hidden');
                page('#world-' + (worldIndex+1) + ' .world-ellipse .glyphicon-ok').remove();
            }
		});

		response.write(page.html());
		response.end();
	});
};

module.exports = dashboard;