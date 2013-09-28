var cheerio = require('cheerio');

describe("index.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./public/index.html').toString());
	});
	
	describe("page's title", function() {	

		it("is 'YoseTheGame'", function() {			
			expect(page('title').text()).toBe('YoseTheGame');
		});		
	});
	
	describe("page's elements:", function() {
		
		it("has a placeholder for a title", function() {			
			expect(page('#title').text()).toContain("You've got Nutella on your nose");
		});

		it("has a placeholder for a welcome message", function() {
			expect(page('#welcome').length).toEqual(1);
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
				
				it('contains an empty placeholder for the avatar', function() {
					expect(page('#players .player img.avatar').attr('src')).toEqual('');
				});
				
				it('contains an empty placeholder for the level', function() {
					expect(page('#players .player .level').text()).toEqual('Level');
				});
				
				it('contains a placeholder for the achievements', function() {
					expect(page('#players .player ul li img').attr('src')).toEqual('star');
				});
				
				it('contains an empty placeholder for the score', function() {
					expect(page('#players .player .hall-of-fame-score').text()).toEqual('1234567');
				});
			});
			
		});
	});
		
});