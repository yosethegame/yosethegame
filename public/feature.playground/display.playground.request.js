var url         = require('url');
var fs          = require('fs');
var cheerio     = require('cheerio');
var array       = require('../js/utils/array.utils');
var withValue   = require('../js/utils/array.matchers');
var thePlayer   = require('../js/utils/player.utils');

var fillBannerWithGreetings = require('../js/banner');
var exitWithMessage         = require('../js/exit.with.message');

var fillBanner = function(page, player, world, worldNumber, level, levelNumber) {
	var greetings = 'level ' + worldNumber + '.' + levelNumber + ' : ' + level.title;
	
	fillBannerWithGreetings(page, player, greetings);
};

playground = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.playground/playground.html').toString();
	var banner = cheerio.load(fs.readFileSync('./public/feature.dashboard/banner.html').toString())('#sidebar').html();
	var page = cheerio.load(html);
	page('#sidebar').empty().append(banner);
	
	var login = /^\/players\/(.*)\/play/.exec(request.url)[1];
	var worldNumber = parseInt(/^\/players\/(.*)\/play\/world\/(.*)/.exec(request.url)[2]);
	var world = database.worlds[worldNumber - 1];
	if (world === undefined) {
		return exitWithMessage('this world is unknown', page, response);
	}
	var levelNumber = parseInt(/^\/players\/(.*)\/play\/world\/(.*)\/level\/(.*)/.exec(request.url)[3]);
    var level = world.levels[levelNumber - 1];
	if (level === undefined) {
		return exitWithMessage('this level is unknown', page, response);
	}

	database.find(login, function(player) {

		if (player === undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}	
		
		if (!world.isOpenFor(player)) {
			return exitWithMessage('this world is locked', page, response);
		}

        if (!level.isOpenLevelFor(player)) {
            return exitWithMessage('this level is locked', page, response);
        }

		if (thePlayer.hasCompletedThisWorld(player, world)) {
			page('#next-challenge').addClass('hidden').removeClass('visible');
			page('#result').addClass('hidden').removeClass('visible');
			page('#world-completed').addClass('visible').removeClass('hidden');
			response.write(page.html());
			response.end();
			return;
		}
		
		if (thePlayer.hasDoneThisLevel(player, level)) {
            return exitWithMessage('this level is completed', page, response);
		}
			
		page('#login').empty().text(player.login);
			
		fillBanner(page, player, world, worldNumber, level, levelNumber);
		
		page('#next-challenge-title').text(level.title);
		if (level.file !== undefined) {
			var challenge = cheerio.load(fs.readFileSync(level.file).toString());
			page('#next-challenge-assignment').empty().append(challenge('#challenge-assignment').html());
			page('#next-challenge-details').empty().append(challenge('#challenge-details').html());
			page('#next-challenge-tips').empty().append(challenge('#challenge-tips').html());
			if(!thePlayer.hasServer(player)) {
                page("#server-input-section").addClass('visible').removeClass('hidden');
			}
		}

		page('#try').attr('onclick', 'new TryListener().try(' + worldNumber + ', ' + levelNumber + ')');

		page('#continue-link').attr('href', '/players/' + player.login);

		response.write(page.html());
		response.end();
	});
	
};

module.exports = playground;