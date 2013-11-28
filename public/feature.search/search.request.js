var fs          = require('fs');
var cheerio     = require('cheerio');
var array       = require('../js/utils/array.utils');
var renderScore	= require('../js/utils/render.score');
var thisPlayer	= require('../js/utils/player.utils');

search = function(request, response, database) {
	var criteria = /^\/players\/search\/(.*)$/.exec(request.url)[1];
	var html = fs.readFileSync('./public/feature.search/results.html').toString();
	var page = cheerio.load(html);

    var template = page.html('#players .player');
    page('#players .player').remove();
    
    database.findPlayersMatching(criteria, function(players) {
        page('#result-count').text(players.length + ' matching players');
        array.forEach(players, function(player) {
            var line = template.replace('<img src=""', '<img src="' + player.avatar + '"')
                               .replace('1234567', renderScore.withoutLeadingZeros(player.score))
                               .replace('0000', renderScore.leadingZeros(player.score))
                               ;
            if (thisPlayer.hasServer(player)) {
                line = line.replace('<a href=""></a>', '<a href="' + thisPlayer.serverOf(player) + '">' + thisPlayer.serverOf(player) + '</a>');
            }
            else {
                line = line.replace('<a href=""></a>', 'undefined');
            }
            page('#players').append(line);
        });
        
        response.write(page.html());
        response.end();
    });

};

module.exports = search;