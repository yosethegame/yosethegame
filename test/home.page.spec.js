var home 			 = require('../public/js/home.page');
var cheerio 		 = require('cheerio');
var InMemoryDatabase = require('./support/InMemoryDatabase');

describe('Home page building', function() {

	var database = { levels: [
			{ number: 1, name: 'one', challenges: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' } ] },
			{ number: 2, name: 'two', challenges: [ { title: 'challenge 2.1' } ] }
		]};

	it('is based on player line template', function() {
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);
		
		expect(home.extractPlayerTemplateIn(page)).toEqual('<li class="player"></li>');
	});
	
	it('bulds two lines when there are 2 players', function() {
		var players = [
				{ login: 'me' },
				{ login: 'you' }
			];
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);		
		var list = home.buildPlayerList(page, players, database);
		
		expect(cheerio.load(list)('.player').length).toEqual(2);
	});
	
	it('replaces the template by the player list', function() {
		var players = [
				{ login: 'me' },
				{ login: 'you' }
			];
		var html = '<ul id="players"><li class="player"></li></ul>';
		var page = cheerio.load(html);		
		var output = home.insertPlayerList(page, players, database);

		expect(cheerio.load(output)('#players .player').length).toEqual(2);
	});
	
	describe('player line', function() {
	
		var template = '<li class="player">' +
							'<img src="" class="avatar">' +
							'<span class="level">Level</span>' +
							'<ul>' +
								'<li><img src="star"></li>' +
							'</ul>' +
							'<span class="hall-of-fame-score">1234567</span>' +
					   '</li>';
		
		it('contains the avatar', function() {
			var line = home.buildLine(template, { avatar: 'me.png' }, database );

			expect(cheerio.load(line)('.player img.avatar')[0].attribs.src).toEqual('me.png');
		});
		
		it('contains the score', function() {
			var line = home.buildLine(template, { avatar: 'me.png', score: 420 }, database );

			expect(cheerio.load(line)('.player .hall-of-fame-score').text()).toEqual('000420');
		});
		
		describe('Level', function() {
			
			it('is level 1 when the player is a new player', function() {
				var line = home.buildLine(template, { avatar: 'me.png' }, database );
				
				expect(cheerio.load(line)('.player .level').text()).toEqual('Level 1 : one');
			});
			
			it('is level 2 when player has completed level 1', function() {
				var line = home.buildLine(template, { avatar: 'me.png', portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' } ] }, database );

				expect(cheerio.load(line)('.player .level').text()).toEqual('Level 2 : two');
			});
		});
		
		describe('Achievements:', function() {
		
			describe('When the player is a new player,', function() {

				it('displays two stars', function() {
					var line = home.buildLine(template, { avatar: 'me.png' }, database);

					expect(cheerio.load(line)('.player ul li').length).toEqual(2);
				});
				
				it('displays the first star as undone', function() {
					var line = home.buildLine(template, { avatar: 'me.png' }, database);

					expect(cheerio.load(line)('.player ul li img')[0].attribs.src).toContain('star-undone');
				});

				it('displays the second star as undone', function() {
					var line = home.buildLine(template, { avatar: 'me.png' }, database);

					expect(cheerio.load(line)('.player ul li img')[1].attribs.src).toContain('star-undone');
				});
			});
			
			describe('When the player has done the first challenge', function() {
				
				it('displays the first star as done', function() {
					var line = home.buildLine(template, { avatar: 'me.png', portfolio: [ { title: 'challenge 1.1' } ] }, database);

					expect(cheerio.load(line)('.player ul li img')[0].attribs.src).toContain('star-done');
				});

			});
			
		});
		
	});
	
});