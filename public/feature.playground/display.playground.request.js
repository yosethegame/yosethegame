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
		while(array.hasOneItemIn(player.portfolio, withValue.equalsTo(world.levels[levelIndex].id))) { levelIndex ++; }
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

playground = function(request, response, database) {
	var login = /^\/players\/(.*)\/play/.exec(request.url)[1];
	var worldNumber = parseInt(/^\/players\/(.*)\/play\/world\/(.*)/.exec(request.url)[2]);
	var world = database.worlds[worldNumber - 1];

	var html = fs.readFileSync('./public/feature.playground/playground.html').toString();
	var page = cheerio.load(html);
	
	database.find(login, function(player) {

		if (player == undefined) {
			page('#info').addClass('visible').removeClass('hidden');
			page('#player').addClass('hidden').removeClass('visible');
			response.write(page.html());
			response.end();
			return;
		}		
		fillBanner(page, player, world, worldNumber);

		response.write(page.html());
		response.end();
	});
	
}

module.exports = playground;