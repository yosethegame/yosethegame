var url         = require('url');
var fs          = require('fs');
var cheerio     = require('cheerio');
var renderScore = require('../../common/lib/render.score');
var array       = require('../../../utils/lib/array.utils');
var withValue   = require('../../../utils/lib/array.matchers');
var thePlayer   = require('../../../lib/player.utils');
var thisPlayer  = require('../../../lib/player.utils');
var request     = require('request');

var fillBannerWithGreetings = require('../../common/lib/banner');
var showServerOfPlayer      = require('../../common/lib/show.server.of.player');
var exitWithMessage         = require('../../common/lib/exit.with.message');

var tryRequest = require('../../feature.try/lib/try.request');

var allLevelsToTry = function(player, world) {
	var levelsToTry = [];
	array.forEach(world.levels, function(level) {
		if (thisPlayer.hasDoneThisLevel(player, level)) {
			levelsToTry.push(level);
		}
	});
	return levelsToTry;
};

var displayOuput = function(output, page) {
    var result_n_html = page.html('#result_1');
    page('#result_1').remove();
    for (var i=0; i<output.length; i++) {
        var result_i_html = result_n_html.replace('result_1', 'result_' + (i+1));
        page('#results').append(result_i_html);
        page('#result_' + (i+1) + ' .challenge').text(output[i].title);
        page('#result_' + (i+1) + ' .status').text(output[i].code == 200 ? 'success': 'fail');
        page('#result_' + (i+1) + ' .expected').text(typeof output[i].expected == 'string' ? output[i].expected: JSON.stringify(output[i].expected));
        page('#result_' + (i+1) + ' .got').text(typeof output[i].got == 'string' ? output[i].got: JSON.stringify(output[i].got));

        if (output[i].code != 200) {
            page('#result_' + (i+1)).removeClass('success').addClass('danger');
        }
    }
};

var rerun = function(request, response, database, done) {
	var html = fs.readFileSync('./app/features/feature.rerun/lib/rerun.html').toString();
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
			
		fillBannerWithGreetings(page, player, 'Rerun the completed levels of ' + world.name);
		showServerOfPlayer(page, player);
		
		tryRequest.tryLevelsStartingAtIndex(0, allLevelsToTry(player, world), {}, player, database, [], function(output) {
            displayOuput(output, page);

            response.write(page.html());
            response.end();
            if (done !== undefined) {
                done();
            }
        });
	});
};

module.exports = rerun;