var url 		= require('url');
var fs 			= require('fs');
var cheerio 	= require('cheerio');
var renderScore	= require('../js/utils/render.score');
var array		= require('../js/utils/array.utils');
var withValue	= require('../js/utils/array.matchers');
var thePlayer	= require('../js/utils/player.utils');

var nextLevelOf = function(player, world) {
	var levelIndex = 0;
	if (!thePlayer.isANew(player)) {
		while(thePlayer.hasDoneThisLevel(player, world.levels[levelIndex])) { levelIndex ++; }
	}
	return levelIndex;
};

var fillBanner = function(page, player, world, worldNumber) {
	page("#avatar").attr('src', player.avatar);
	page('#score').text(renderScore(player.score));
	var levelIndex = nextLevelOf(player, world);
	var level = world.levels[levelIndex];
	var greetings = 'level ' + worldNumber + '.' + (levelIndex + 1) + ' : ' + level.title;
	page('#greetings').text(greetings);		
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

var isWorldCompletedByPlayer = function(player, world) {
	if (thePlayer.isANew(player)) { return false; }
	var completed = true;
	array.forEach(world.levels, function(level) {
		if (! thePlayer.hasDoneThisLevel(player, level)) {
			completed = false;
		}
	});
	return completed;
}

playground = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.playground/playground.html').toString();
	var page = cheerio.load(html);
	
	var login = /^\/players\/(.*)\/play/.exec(request.url)[1];
	var worldNumber = parseInt(/^\/players\/(.*)\/play\/world\/(.*)/.exec(request.url)[2]);
	var world = database.worlds[worldNumber - 1];
	if (world == undefined) {
		return exitWithMessage('this world is unknown', page, response);
	}

	database.find(login, function(player) {

		if (player == undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}	
		
		if (!world.isOpenFor(player)) {
			return exitWithMessage('this world is locked', page, response);
		}
		
		if (isWorldCompletedByPlayer(player, world)) {
			page('#next-challenge').addClass('hidden').removeClass('visible');
			page('#result').addClass('hidden').removeClass('visible');
			page('#world-completed').addClass('visible').removeClass('hidden');
			response.write(page.html());
			response.end();
			return;
		}
			
		page('#login').empty().text(player.login);
			
		fillBanner(page, player, world, worldNumber);
		
		var level = world.levels[nextLevelOf(player, world)];
		page('#next-challenge-title').text(level.title);
		if (level.file != undefined) {
			var challenge = cheerio.load(fs.readFileSync(level.file).toString());
			page('#next-challenge-content').empty().append(challenge('#challenge-content').html());
		}
		page('#try').attr('onclick', 'new TryListener().try(' + worldNumber + ')');

		page('#continue-link').attr('href', '/players/' + player.login);

		response.write(page.html());
		response.end();
	});
	
}

module.exports = playground;