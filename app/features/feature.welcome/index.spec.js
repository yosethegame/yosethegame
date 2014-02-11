var cheerio = require('cheerio');

describe("index.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./app/features/feature.welcome/lib/index.html').toString());
	});
	
	describe("page's title", function() {	

		it("is 'YoseTheGame'", function() {			
			expect(page('title').text()).toContain('YoseTheGame');
		});		
	});
	
	describe("page's elements:", function() {
		
		it('has a placeholder for the player count', function() {
            expect(page('#player-count').length).toEqual(1);
		});
		
		it('has a placeholder for the total score', function() {
            expect(page('#score-community').length).toEqual(1);
		});
		
		describe('login form', function() {

            it('has a login input field', function() {
                expect(page('input#login').length).toEqual(1);
            });
            
            it('offers a way to create a new player', function() {
                expect(page('a#create-new-player-link').attr('href')).toEqual('/create-new-player');
            });

		});

		describe('player list', function() {
			
			it('has a title for the players column', function() {
				expect(page('#players-title').length).toEqual(1);
			});
			
			it('has a title for the score column', function() {
				expect(page('#score-title').length).toEqual(1);
			});
			
			it('exists', function() {
				expect(page('#players').length).toEqual(1);
			});
			
			it('contains a template for the lines', function() {
				expect(page('#players .player').length).toEqual(1);
			});
			
			describe('line template', function() {
				
				it('contains an empty placeholder for the link to the dashboard', function() {
					expect(page('#players .player a').attr('href')).toEqual('');
				});
				
				it('contains an empty placeholder for the avatar', function() {
					expect(page('#players .player img.avatar').attr('src')).toEqual('');
				});
				
				it('contains an empty placeholder for the leading zeros before the score', function() {
					expect(page('#players .player .hall-of-fame-score-leading-zeros').text()).toEqual('0000');
				});

				it('contains an empty placeholder for the score', function() {
					expect(page('#players .player .hall-of-fame-score').text()).toEqual('1234567');
				});
			});
			
		});
	});
		
});