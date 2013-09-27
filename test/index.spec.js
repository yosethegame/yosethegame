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
			expect(page('#welcome').text()).toBe('coming soon :)');
		});		

		it("displays a 'fork me on github.com' banner", function() {
			expect(page('#github').attr('href')).toBe('https://github.com/ericminio/you-ve-got-nutella-on-your-nose');
		});
		
		describe('player list', function() {
			
			it('has a title', function() {
				expect(page('#players-title').length).toEqual(1);
			});
			
			it('exists', function() {
				expect(page('#players').length).toEqual(1);
			});
			
			it('contains a template for the lines', function() {
				expect(page('#players .player').length).toEqual(1);
			});
			
		});
	});
		
});