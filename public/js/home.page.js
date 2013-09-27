var fs 		  	= require('fs');
var cheerio   	= require('cheerio');

var extractPlayerTemplateIn = function(page) {
	
};

index = function(request, response, database) {
	var html = fs.readFileSync('./public/index.html').toString();

	var page = cheerio.load(html);
	var player_template = this.playerTemplate(page);

	response.write(html);
	response.end();
}

module.exports = index;
module.exports.extractPlayerTemplateIn = extractPlayerTemplateIn;