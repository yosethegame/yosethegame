var cheerio = require('cheerio');

describe("index.html", function() {

	var page;

	beforeEach(function() {	
        var index = require('./lib/home.page');
        var response = { write: function(html) { this.html = html; }, end: function() {} };
        index({}, response, {});
		page = cheerio.load(response.html);
	});
	
	describe("page's title", function() {	

		it("is 'YoseTheGame'", function() {			
			expect(page('title').text()).toContain('YoseTheGame');
		});		
	});
	
	describe("menu", function() {
		
        it('contains a link to create a new player', function() {
            expect(page('a#create-new-player-link').attr('href')).toEqual('/create-new-player');
        });

        it('contains a link to access the community page', function() {
            expect(page('a#community-link').attr('href')).toEqual('/community');
        });

        it('contains a form to access your dashboard', function() {
            expect(page('input#login').length).toEqual(1);
        });
	});
});