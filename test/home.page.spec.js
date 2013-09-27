var home 			 = require('../public/js/home.page');
var cheerio 		 = require('cheerio');
var InMemoryDatabase = require('./support/InMemoryDatabase');

describe('Home page building', function() {

	it('is based on player line template', function() {
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		
		expect(home.extractPlayerTemplateIn(page)).toEqual('<li class="player"></li>');
	});
	
	it('inserts two lines in player list when there are 2 players', function(done) {
		var database = new InMemoryDatabase().withPlayers([
				{ login: 'me' },
				{ login: 'you' }
			]);
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		
		home.buildPlayerList(page, database, function(list) {
			expect(cheerio.load(list)('.player').length).toEqual(2);
			done();
		});
	});
	
	describe('player line', function() {
	
		var database = new InMemoryDatabase().withPlayers([ { login: 'me', avatar: 'me.png' }, ]);
		var html = '<ul id="players"><li class="player"><img src=""></li></ul>';
		var page = cheerio.load(html);
	
		it('displays the avatar', function(done) {
			home.buildPlayerList(page, database, function(list) {
				expect(cheerio.load(list)('.player img')[0].attribs.src).toEqual('me.png');
				done();
			});
		});
		
	});
	
});