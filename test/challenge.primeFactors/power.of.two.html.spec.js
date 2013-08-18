var cheerio = require('cheerio');

describe("power.of.two.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./public/challenge.primeFactors/power.of.two.html').toString());
	});
	
	describe("page's element", function() {
		
		it("server input text is available", function() {			
			expect(page('input#server').length).toBe(1);
		});		

		it("try server button is available", function() {			
			expect(page('button#try').length).toBe(1);
		});		

		it("success placeholder is available", function() {			
			expect(page('#success').length).toBe(1);
		});		
		
		it("error placeholders are available", function() {			
			expect(page('#error').length).toBe(1);
			expect(page('#expected').length).toBe(1);
			expect(page('#got').length).toBe(1);
		});
	});
	
		
});