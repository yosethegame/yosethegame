var cheerio 	 	 = require('cheerio');
var dashboard	 	 = require('../public/js/dashboard.js');
var InMemoryDatabase = require('./support/inMemoryDatabase');

describe('Dashboard >', function() {
	
	var page;
	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	}
	
	describe('The elements of the page:', function() {

		beforeEach(function() {	
			dashboard({}, response);
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
	});
	
	describe('info/player toggle', function() {
	
		var database;
		
		beforeEach(function() {	
			database = new InMemoryDatabase().withPlayers([
				{ login: 'ericminio' }
			]);
			dashboard({ url: 'players/ericminio' }, response, database);
			page = cheerio.load(response.html);
		});

		it('hides the info section when player exists in the database', function() {
			expect(page('#info').attr('class')).toContain('hidden');
		});
		
		it('shows the player section when the player exists in the database', function() {
			expect(page('#player').attr('class')).toContain('visible');
		})
		
	});
	
	describe('Avatar', function() {
		
		var database;
		
		beforeEach(function() {	
			database = new InMemoryDatabase().withPlayers([
				{ 
					login: 'ericminio',
					avatar: 'http://annessou-avatar'
				}
			]);
			dashboard({ url: 'players/ericminio' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('is displayed when player has an avatar', function() {
			expect(page('#avatar').attr('src')).toEqual('http://annessou-avatar');
		});
		
	});
	
	describe('Login hidden field avalaility', function() {
	
		var database;
		
		beforeEach(function() {	
			database = new InMemoryDatabase().withPlayers([
				{ login: 'ericminio' }
			]);
		});
		
		it('makes login available in the page to be used eventually', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#login').text()).toEqual('ericminio');
		});
	});
	
	describe('Challenge invitation', function() {
		
		var database;
		
		beforeEach(function() {	
			database = new InMemoryDatabase();
			database.challenges = [
				{ title: 'First challenge' },
				{ title: 'Second challenge' }
			];
			database.players = [
				{ login: 'ericminio' },
				{ 
					login: 'annessou', 
					portfolio: [
						{ title: 'First challenge' }
					]
				},
				{
					login: 'bilou',
					portfolio: [
						{ title: 'First challenge' },
						{ title: 'Second challenge' }
					]
				}
			];
		});

		it('displays the first challenge to a new player', function() {
			dashboard({ url: '/players/ericminio' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#next-challenge-title').text()).toEqual('First challenge');
		});
		
		it('displays the next undone challenge to a player with a portfolio', function() {
			dashboard({ url: '/players/annessou' }, response, database);
			page = cheerio.load(response.html);

			expect(page('#next-challenge-title').text()).toEqual('Second challenge');
		});
		
		describe('when no more challenge is available', function() {
		
			it('displays the coming-soon section', function() {
				dashboard({ url: '/players/bilou' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#when-no-more-challenges').attr('class')).toContain('visible');
			});
			
			it('hides the next-challenge section', function() {
				dashboard({ url: '/players/bilou' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#next-challenge').attr('class')).toContain('hidden');
			});
			
		});
		
	});
	
	describe('Challenge content display:', function() {
	
		var database;
		var fs = require('fs');
		
		beforeEach(function() {	
			var content = '<html><body>anything before<div id="challenge-content">content<label>with html</label></div>anything after</body></html>';
			fs.writeFileSync('test/data/challenge-file.html', content);			
			
			database = new InMemoryDatabase();
			database.challenges = [
				{ 
					title: 'First challenge',
					file: 'test/data/challenge-file.html' 
				}
			];
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
	
	describe('Achievements display:', function() {
	
		var database;
		
		beforeEach(function() {	
			database = new InMemoryDatabase();
			database.challenges = [
				{ title: 'First challenge' },
				{ title: 'Second challenge' }
			];
			database.players = [
				{ 
					login: 'ericminio', 
				},
				{
					login: 'annessou',
					portfolio: [
						{
							title: 'First challenge'
						}
					]
				},
				{
					login: 'bilou',
					portfolio: [
						{
							title: 'First challenge'
						},
						{
							title: 'Second challenge'
						}
					]
				}
			];
		});
		
		describe('When the player has an empty portfolio,', function() {
			
			it('displays an undone star for the first challenge', function() {
				dashboard({ url: '/players/ericminio' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#achievement_1').html()).toContain('star-undone');
			});
			
			it('displays an undone star for the second challenge', function() {
				dashboard({ url: '/players/ericminio' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#achievement_2').html()).toContain('star-undone');
			});
		});	
		
		describe('When the player has done the first challenge,', function() {
		
			it('displays a done star for the first challenge', function() {
				dashboard({ url: '/players/annessou' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#achievement_1').html()).toContain('star-done');
			});
			
			it('displays an undone star for the second challenge', function() {
				dashboard({ url: '/players/annessou' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#achievement_2').html()).toContain('star-undone');
			});
		});	
		
		describe('When the player has done both challenges,', function() {
			
			it('displays a done star for the first challenge', function() {
				dashboard({ url: '/players/bilou' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#achievement_1').html()).toContain('star-done');
			});
			
			it('displays an undone star for the second challenge', function() {
				dashboard({ url: '/players/bilou' }, response, database);
				page = cheerio.load(response.html);

				expect(page('#achievement_2').html()).toContain('star-done');
			});
		});
		
	});
	
	describe("Player's server", function() {
	
		var database;
		
		beforeEach(function() {	
			database = new InMemoryDatabase();
			database.challenges = [
				{ title: 'First challenge' },
				{ title: 'Second challenge' }
			];
			database.players = [
				{ 
					login: 'ericminio', 
					server: 'here',
					portfolio: [
						{ 
							title: 'First challenge'
						}
					]
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
	
});