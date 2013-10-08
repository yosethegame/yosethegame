var cheerio 	= require('cheerio');
var dashboard	= require('../public/js/dashboard.js');
var Example 	= require('./support/database.with.levels');

describe('Dashboard >', function() {
	
	var database;
	var page;
	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	}
	
	beforeEach(function() {	
		database = new Example();
	});

	describe('The elements of the page:', function() {

		beforeEach(function() {	
			dashboard({}, response, database);
			page = cheerio.load(response.html);
		});

		it('The title', function() {			
			expect(page('title').text()).toBe('Dashboard');
		});		
			
		it("try server button is available", function() {			
			expect(page('button#try').length).toBe(1);
		});		

		describe('The placeholder of the information messages', function() {
				
			it('exists', function() {
				expect(page('#info').length).toNotBe(0);
			});

			it('appears as an error', function() {
				expect(page('#info').attr('class')).toContain('text-danger');
			});

			it('is visible by default', function() {
				expect(page('#info').attr('class')).toContain('visible');
			});
		});

		describe('The placeholder of the avatar', function() {
				
			it('exists', function() {
				expect(page('#player img#avatar').length).toNotBe(0);
			});

			it('is bounded in a square', function() {
				expect(page('#avatar').attr('width')).toEqual('60');
				expect(page('#avatar').attr('height')).toEqual('60');
			});
				
			it('appears in a circle', function() {
				expect(page('#avatar').attr('class')).toContain('img-circle');
			});
		});	
		
		describe('The placeholder of the player', function() {
				
			it('exists', function() {
				expect(page('#player').length).toNotBe(0);
			});				
			it('is hidden by default (no repository)', function() {
				expect(page('#player').attr('class')).toContain('hidden');
			});
				
			it('contains an hidden placeholder that will store the login of the player', function() {
				expect(page('#player #login').attr('class')).toContain('hidden');
			});
		});	
		
		describe('The placeholder of the level', function() {
		
			it('exists (number)', function() {
				expect(page('#level-number').length).toNotBe(0);
			});
			it('exists (name)', function() {
				expect(page('#level-name').length).toNotBe(0);
			});
			
		});
			
		describe('The placeholder of the achievements', function() {

			it('exists', function() {
				expect(page('#achievements').length).toNotBe(0);
			});

			it('contains the template for each achievement', function() {
				expect(page('#achievements #achievement_n').length).toNotBe(0);
			});
		});
			
		describe('The placeholder of the next-challenge', function() {
			it('exists', function() {
				expect(page('#next-challenge').length).toNotBe(0);
			});
			it('is visible by default', function() {
				expect(page('#next-challenge').attr('class')).toContain('visible');
			});
		});

		describe('The placeholder of the when-no-more-challenges message', function() {
			it('exists', function() {
				expect(page('#when-no-more-challenges').length).toNotBe(0);
			});
			it('is hidden by default', function() {
				expect(page('#when-no-more-challenges').attr('class')).toContain('hidden');
			});
		});
		
		describe('The placeholder for the invitation to continue', function() {
			it('exists', function() {
				expect(page('#continue').length).toNotBe(0);
			});
			it('is hidden by default', function() {
				expect(page('#continue').attr('class')).toContain('hidden');
			});
		});
		
		describe('The placeholder for the server of the player', function() {
			it('exists', function() {
				expect(page('#server-of-player').length).toNotBe(0);
			});
			it('is hidden by default', function() {
				expect(page('#server-of-player').attr('class')).toContain('hidden');
			});
		});

		describe('The placeholder for the restart game', function() {
			it('exists', function() {
				expect(page('#restart-game').length).toNotBe(0);
			});
			it('is hidden by default', function() {
				expect(page('#restart-game').attr('class')).toContain('hidden');
			});
		});
		
		describe('The help link', function() {
			it('targets google group', function() {
				expect(page('a#help').attr('href')).toEqual('https://groups.google.com/forum/?hl=fr#!forum/yosethegame');
			});			
		});
		
		describe('The placeholder for the score', function() {
			it('exists', function() {
				expect(page('#score').length).toEqual(1);
			});
		});

		describe('The placeholder for the link to the hall of fame', function() {
			it('exists', function() {
				expect(page('#hall-of-fame').length).toEqual(1);
			});
		});
	});
	
	describe('info/player toggle,', function() {
	
		beforeEach(function() {	
			database.players = [
				{ login: 'ericminio' }
			];
		});
		
		describe('when the player is known', function() {

			beforeEach(function() {
				dashboard({ url: 'players/ericminio' }, response, database);
				page = cheerio.load(response.html);
			});
			
			it('hides the info section', function() {
				expect(page('#info').attr('class')).toContain('hidden');
			});

			it('shows the player section', function() {
				expect(page('#player').attr('class')).toContain('visible');
			});

		});
		
		describe('when the player is unknown', function() {
			
			beforeEach(function() {
				dashboard({ url: 'players/annessou' }, response, database);
				page = cheerio.load(response.html);
			});
			
			it('keeps the info section visible', function() {
				expect(page('#info').attr('class')).toContain('visible');
			});

			it('keeps the player section hidden', function() {
				expect(page('#player').attr('class')).toContain('hidden');
			});
		});

	});
	
	describe('Avatar', function() {
		
		beforeEach(function() {	
			database.players = [
				{ 
					login: 'ericminio',
					avatar: 'http://ericminio-avatar'
				}
			];
			dashboard({ url: 'players/ericminio' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('is displayed when player has an avatar', function() {
			expect(page('#avatar').attr('src')).toEqual('http://ericminio-avatar');
		});
		
	});
	
	describe('Login hidden field avalaility', function() {
	
		beforeEach(function() {	
			database.players = [
				{ login: 'ericminio' }
			];
		});
		
		it('makes login available in the page to be used eventually', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#login').text()).toEqual('ericminio');
		});
	});
	
	describe('Challenge invitation', function() {
		
		beforeEach(function() {	
			database.players = [
				{ login: 'ericminio' },
				{ 
					login: 'annessou', 
					portfolio: [
						{ title: 'challenge 1.1' }
					]
				},
				{
					login: 'bilou',
					portfolio: [
						{ title: 'challenge 1.1' },
						{ title: 'challenge 1.2' },
						{ title: 'challenge 2.1' },
						{ title: 'challenge 2.2' },
					]
				}
			];
		});

		it('displays the first challenge to a new player', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#next-challenge-title').text()).toEqual('challenge 1.1');
		});
		
		it('displays the next undone challenge to a player with a portfolio', function() {
			dashboard({ url: '/players/annessou' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#next-challenge-title').text()).toEqual('challenge 1.2');
		});
		
		describe('when no more challenge is available', function() {
		
			beforeEach(function() {
				dashboard({ url: '/players/bilou' }, response, database);
				page = cheerio.load(response.html);
			});
		
			it('displays the coming-soon section', function() {
				expect(page('#when-no-more-challenges').attr('class')).toContain('visible');
			});
			
			it('hides the next-challenge section', function() {
				expect(page('#next-challenge').attr('class')).toContain('hidden');
			});
			
		});
		
	});
	
	describe('Challenge content display:', function() {
	
		var fs = require('fs');
		
		beforeEach(function() {	
			var content = '<html><body>anything before<div id="challenge-content">content<label>with html</label></div>anything after</body></html>';
			fs.writeFileSync('test/data/challenge-file.html', content);			
			
			database.levels[0].challenges[0].file = 'test/data/challenge-file.html';
			database.players = [
				{ login: 'ericminio' }
			];
		});

		it('displays the next challenge content', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#next-challenge-content').html()).toEqual('content<label>with html</label>');			
		});
	});
	
	describe('Level display:', function() {
	
		describe('When the player has an empty portfolio,', function() {
		
			beforeEach(function() {
				database.players = [
					{ 
						login: 'ericminio', 
					}
				];				
				dashboard({ url: '/players/ericminio' }, response, database);
				page = cheerio.load(response.html);
			});
		
			it('displays level 1', function() {
				expect(page('#level-number').text()).toEqual('1');
			});
			
			it('displays the name of level 1', function() {
				expect(page('#level-name').text()).toEqual('The first level');
			});
		});
		
	});
	
	describe('Achievements display:', function() {
	
		beforeEach(function() {	
			database.players = [
				{ 
					login: 'ericminio', 
				},
				{
					login: 'annessou',
					portfolio: 	[ { title: 'challenge 1.1' } ]
				},
				{
					login: 'bilou',
					portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' } ]
				}
			];
		});
		
		describe('When the player has an empty portfolio,', function() {
			
			beforeEach(function() {
				dashboard({ url: '/players/ericminio' }, response, database);
				page = cheerio.load(response.html);
			});
			
			it('displays an undone star for the first challenge', function() {
				expect(page('#achievement_1').html()).toContain('star-undone');
			});
			
			it('displays an undone star for the second challenge', function() {
				expect(page('#achievement_2').html()).toContain('star-undone');
			});
		});	
		
		describe('When the player has done the first challenge,', function() {

			beforeEach(function() {
				dashboard({ url: '/players/annessou' }, response, database);
				page = cheerio.load(response.html);
			});
		
			it('displays a done star for the first challenge', function() {
				expect(page('#achievement_1').html()).toContain('star-done');
			});
			
			it('displays an undone star for the second challenge', function() {
				expect(page('#achievement_2').html()).toContain('star-undone');
			});
		});	
		
		describe('When the player has finished the first level,', function() {
			
			beforeEach(function() {
				dashboard({ url: '/players/bilou' }, response, database);
				page = cheerio.load(response.html);				
			});
			
			it('displays a undone star for the first challenge of second level', function() {
				expect(page('#achievement_1').html()).toContain('star-undone');
			});
			
			it('displays a undone star for the second challenge of the second level', function() {
				expect(page('#achievement_2').html()).toContain('star-undone');
			});
		});
		
	});
	
	describe("Player's server", function() {
	
		beforeEach(function() {	
			database.players = [
				{ 
					login: 'ericminio', 
					server: 'here',
					portfolio: [ {  title: 'challenge 1.1' } ]
				}
			];
		});
		
		it('is displayed when the player has one', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);
			
			expect(page('#server-of-player').attr('class')).toContain('visible');
			expect(page('#server-of-player').text()).toEqual('here');
		});
		
	});
	
	describe('Restart game mention', function() {
		
		beforeEach(function() {	
			database.players = [
				{ 
					login: 'ericminio', 
					portfolio: [ {  title: 'challenge 1.1' } ]
				}
			];
		});
		
		it('is displayed when the player has one', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);
			
			expect(page('#restart-game').attr('class')).toContain('visible');
		});

	});
	
	describe('Score', function() {
	
		beforeEach(function() {	
			database.players = [
				{ 
					login: 'ericminio', 
					score: 10,
					portfolio: [ {  title: 'challenge 1.1' } ]
				}
			];
		});

		it('is displayed', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);
			
			expect(page('#score').text()).toEqual('000010');
		});
		
	});
	
});