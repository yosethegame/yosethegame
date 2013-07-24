var cheerio 	 = require('cheerio');
var dashboard	 = require('../public/js/dashboard.js');

describe('Dashboard', function() {
	var page;

	beforeEach(function() {	
		page = cheerio.load(dashboard.html());
	});
	
	describe("page's title", function() {	

		it("is 'Dashboard'", function() {			
			expect(page('title').text()).toBe('Dashboard');
		});		
	});
	
	describe('when player is unknown', function() {
		
		it('displays unknow player mention', function() {
			expect(page('#info').text()).toEqual('Unknown player');
		});
	});
	
});