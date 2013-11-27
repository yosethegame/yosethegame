var fs      = require('fs');
var cheerio = require('cheerio');

search = function(request, response, database) {
	var criteria = /^\/players\/tags\/(.*)$/.exec(request.url)[1];
	var html = fs.readFileSync('./public/feature.search/results.html').toString();
	var page = cheerio.load(html);

    response.write(page.html());
	response.end();
};

module.exports = search;