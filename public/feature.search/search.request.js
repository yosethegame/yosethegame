var fs      = require('fs');
var cheerio = require('cheerio');
var array   = require('../js/utils/array.utils');
var renderScore	= require('../js/utils/render.score');

search = function(request, response, database) {
	var criteria = /^\/players\/tags\/(.*)$/.exec(request.url)[1];
	var html = fs.readFileSync('./public/feature.search/results.html').toString();
	var page = cheerio.load(html);

    var template = page.html('#players .player');
    page('#players .player').remove();
    
    database.findPlayersMatching(criteria, function(players) {

        array.forEach(players, function(player) {
            var line = template.replace('<img src=""', '<img src="' + player.avatar + '"')
                               .replace('1234567', renderScore.withoutLeadingZeros(player.score))
                               .replace('0000', renderScore.leadingZeros(player.score))
                               ;
            page('#players').append(line);
        });
        
        response.write(page.html());
        response.end();
    });

};

module.exports = search;