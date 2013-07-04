var cheerio = require('cheerio');

describe("index.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./public/index.html').toString());
	});
	
	describe("page's title", function() {	

		it("is 'YOSE'", function() {			
			expect(page('title').text()).toBe('YOSE');
		});		
	});
	
	describe("page's element", function() {
		
		it("full title is displayed in the page", function() {			
			expect(page('.title').text()).toContain("You've got Nutella on your nose");
		});

		it("coming soon mention", function() {
			expect(page('#welcome').text()).toBe('coming soon :)');
		});		

		it("displays a 'fork me on github.com' banner", function() {
			expect(page('#github').attr('href')).toBe('https://github.com/ericminio/you-ve-got-nutella-on-your-nose');
		});
	});
		
});