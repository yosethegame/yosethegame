var home 			 = require('../public/js/home.page');
var cheerio 		 = require('cheerio');
var InMemoryDatabase = require('./support/InMemoryDatabase');

describe('Home page building', function() {

	it('is based on player line template', function() {
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		
		expect(home.extractPlayerTemplateIn(page)).toEqual('<li class="player"></li>');
	});
	
	it('inserts two lines in player list when there are 2 players', function() {
		var database = new InMemoryDatabase().withPlayers([
				{ login: 'me' },
				{ login: 'you' }
			]);
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		var list = home.buildPlayerList(page, database);

		expect(cheerio.load(list)('#players .player').length).toEqual(2);
	});
	
});