var fs 		  	= require('fs');
var cheerio   	= require('cheerio');

var extractPlayerTemplateIn = function(page) {
	return page.html('#players .player');
};

var buildPlayerList = function(page, database) {
	return page.html();
};

index = function(request, response, database) {
	var html = fs.readFileSync('./public/index.html').toString();

	var page = cheerio.load(html);
	var list = this.buildPlayerList(page);
	html = html.replace(this.extractPlayerTemplateIn(page), list);

	response.write(html);
	response.end();
}

module.exports = index;
module.exports.extractPlayerTemplateIn = extractPlayerTemplateIn;
module.exports.buildPlayerList = buildPlayerList;