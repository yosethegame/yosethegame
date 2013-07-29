var cheerio 	 = require('cheerio');
var dashboard	 = require('../public/js/dashboard.js');

describe('Dashboard >', function() {
	
	var page;
	
	beforeEach(function() {	
		var response = {
			write: function(content) { this.html = content; },
			end: function() {}
		}
		dashboard({}, response);
		page = cheerio.load(response.html);
	});


	describe('The elements of the page:', function() {

		it('The title', function() {			
			expect(page('title').text()).toBe('Dashboard');
		});		
			
		describe('The placeholder of the information messages', function() {
				
				it('exists', function() {
					expect(page('#info').length).toNotBe(0);
				});

				it('appears as an error', function() {
					expect(page('#info').attr('class')).toContain('text-error');
				});

				it('is visible by default', function() {
					expect(page('#info').attr('class')).toContain('visible');
				});
			});

			describe('The placeholder of the avatar', function() {
				
				it('exists', function() {
					expect(page('#player img').length).toNotBe(0);
				});

				it('is bounded in a square', function() {
					expect(page('#player img').attr('width')).toEqual('60');
					expect(page('#player img').attr('height')).toEqual('60');
				});
				
				it('appears in a circle', function() {
					expect(page('#player img').attr('class')).toEqual('img-circle');
				});
			});	
			
			describe('The placeholder of the player', function() {
				
				it('exists', function() {
					expect(page('#player').length).toNotBe(0);
				});
				
				it('is hidden by default (no repository)', function() {
					expect(page('#player').attr('class')).toContain('hidden');
				});
			});		

	});
	
	
	
});