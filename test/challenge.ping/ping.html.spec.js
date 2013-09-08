var cheerio = require('cheerio');

describe("ping.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./public/challenge.ping/ping.html').toString());
	});
	
	describe("page's element", function() {
		
		it("server input text is available", function() {			
			expect(page('input#server').length).toBe(1);
		});		

	});
		
});