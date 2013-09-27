var home 	= require('../public/js/home.page');
var cheerio = require('cheerio');

describe('Home page building', function() {

	it('is based on player line template', function() {
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		
		expect(home.extractPlayerTemplateIn(page)).toEqual('<li class="player"></li>');
	});
	
});