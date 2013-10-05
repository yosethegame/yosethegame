var form	= require('../../public/feature.create.player/create.player.request');
var cheerio = require('cheerio');

describe('Create player form', function() {
	
	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	
	describe('The elements of the page:', function() {

		beforeEach(function() {	
			form({}, response, {});
			page = cheerio.load(response.html);
		});

		it('has an input field for the login', function() {			
			expect(page('input#login').length).toEqual(1);
		});		
		
		it('has an input field for the avatar', function() {			
			expect(page('input#avatar').length).toEqual(1);
		});	
		
		it('has create button to trigger the creation', function() {
			expect(page('button#create').length).toEqual(1);
		});	
	});
});