var url         = require('url');
var fs          = require('fs');
var cheerio     = require('cheerio');
var renderScore = require('../js/utils/render.score');
var array       = require('../js/utils/array.utils');
var withValue   = require('../js/utils/array.matchers');
var thePlayer   = require('../js/utils/player.utils');

var fillBanner = function(page, player, world, worldNumber) {
	page("#avatar").attr('src', player.avatar);
	page('#score').text(renderScore(player.score));
	page('#dashboard-link').attr('href', '/players/' + player.login);
	page('#greetings').text('Rerun the completed levels of ' + world.name);
};

var exitWithMessage = function(message, page, response) {
	page('#info').addClass('visible').removeClass('hidden');
	page('#info').text(message);
	page('#player').addClass('hidden').removeClass('visible');
	response.write(page.html());
	response.end();
	return;	
};

rerun = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.rerun/rerun.html').toString();
	var page = cheerio.load(html);
	
	var login = /^\/players\/(.*)\/rerun/.exec(request.url)[1];
	var worldNumber = parseInt(/^\/players\/(.*)\/rerun\/world\/(.*)/.exec(request.url)[2]);
	var world = database.worlds[worldNumber - 1];
	if (world === undefined) {
		return exitWithMessage('this world is unknown', page, response);
	}

	database.find(login, function(player) {

		if (player === undefined) {
			return exitWithMessage('this player is unknown', page, response);
		}	
		
		if (!world.isOpenFor(player)) {
			return exitWithMessage('this world is locked', page, response);
		}
		
		page('#login').empty().text(player.login);
			
		fillBanner(page, player, world, worldNumber);
		
		response.write(page.html());
		response.end();
	});
	
};

module.exports = rerun;