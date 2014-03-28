var cheerio                 = require('cheerio');
var hallOfFame              = require('./lib/hall.of.fame');
var DatabaseWithChallenges  = require('../../support/database.with.levels');

describe('Hall of fame building', function() {

	var database = new DatabaseWithChallenges();

	it('is based on player line template', function() {
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		
		expect(hallOfFame.extractPlayerTemplateIn(page)).toEqual('<li class="player"></li>');
	});
	
	it('builds two lines when there are 2 players', function() {
		var players = [
				{ login: 'me' },
				{ login: 'you' }
			];
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);		
		var list = hallOfFame.buildPlayerList(page, players, database);
		
		expect(cheerio.load(list)('.player').length).toEqual(2);
	});
	
	it('replaces the template by the player list', function() {
		var players = [
				{ login: 'me' },
				{ login: 'you' }
			];
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);		
		var output = hallOfFame.insertPlayerList(page, players, database);

		expect(cheerio.load(output)('#players .player').length).toEqual(2);
	});
	
	describe('player line', function() {
	
		var template = '<li class="player">' +
							'<a href="">' +
							'   <img src="" class="avatar">' +
							'</a>' +
							'<span class="hall-of-fame-score-leading-zeros">0000</span>' +
							'<span class="hall-of-fame-score">1234567</span>' +
                        '</li>';
		
        it('links to the dashboard of the player', function() {
            var line = hallOfFame.buildLine(template, { login: 'eric', avatar: 'me.png', portfolio: [ { server: 'server of eric' }] }, database );

            expect(cheerio.load(line)('.player a')[0].attribs.href).toEqual('server of eric');
        });

		it('contains the avatar', function() {
			var line = hallOfFame.buildLine(template, { avatar: 'me.png' }, database );

			expect(cheerio.load(line)('.player img.avatar')[0].attribs.src).toEqual('me.png');
		});
		
		it('contains the score', function() {
			var line = hallOfFame.buildLine(template, { avatar: 'me.png', score: 420 }, database );

			expect(cheerio.load(line)('.player .hall-of-fame-score').text()).toEqual('420');
		});
		
		it('contains the leading zeros', function() {
			var line = hallOfFame.buildLine(template, { avatar: 'me.png', score: 420 }, database );

			expect(cheerio.load(line)('.player .hall-of-fame-score-leading-zeros').text()).toEqual('000');
		});
		
	});
	
});