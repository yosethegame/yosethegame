var cheerio = require('cheerio');
var fs = require('fs');
var fillBannerWithGreetings = require('../../common/lib/banner');
var exitWithMessage = require('../../common/lib/exit.with.message');
var thePlayer = require('../../../lib/player.utils');

displayLevel = function(request, response, database) {

    var html = fs.readFileSync('./app/features/feature.display.level/lib/display.level.html').toString();
	var page = cheerio.load(html);
	var banner = cheerio.load(fs.readFileSync('./app/features/common/lib/banner.html').toString())('#sidebar').html();    
    page('#sidebar').empty().append(banner);

    var route = /^\/players\/(.*)\/display\/world\/(.*)\/level\/(.*)/;
	var login = route.exec(request.url)[1];
	var worldNumber = parseInt(route.exec(request.url)[2]);
    var levelNumber = parseInt(route.exec(request.url)[3]);
    var world = database.worlds[worldNumber - 1];
    if (world === undefined) {
        return exitWithMessage('this world is unknown', page, response);
    }
    var level = world.levels[levelNumber - 1];    
    if (level === undefined) {
        return exitWithMessage('this level is unknown', page, response);
    }

    database.find(login, function(player) {
        
        if (player === undefined) {
            return exitWithMessage('this player is unknown', page, response);
        }
        if (! thePlayer.hasDoneThisLevel(player, level)) {
            return exitWithMessage('this level is not completed', page, response);
        }

        fillBannerWithGreetings(page, player);
    
        page('#next-challenge-title').text(level.title);
    	if (level.file !== undefined) {
    		var challenge = cheerio.load(fs.readFileSync(level.file).toString());
    		page('#next-challenge-assignment').empty().append(challenge('#challenge-assignment').html());
    		page('#next-challenge-details').empty().append(challenge('#challenge-details').html());
    	}
    
        response.write(page.html());
    	response.end();
    });
	
};

module.exports = displayLevel;