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
		
		describe('avatar input field', function() {
		    
    		it('exists', function() {			
    			expect(page('input#avatar').length).toEqual(1);
    		});	
    		
    		it('proposes default value', function() {
    		   expect(page('#avatar').attr('value')).toEqual('/img/default-avatar.png'); 
    		});

		});
		
		describe('preview avatar', function() {
		    
    		it('exists', function() {			
    			expect(page('#avatar-preview').length).toEqual(1);
    		});	
    		
    		it('is initialzed with default avatar', function() {
    		    expect(page('#avatar-preview').attr('src')).toEqual('/img/default-avatar.png');
    		});

		});

        it('has create button to trigger the creation', function() {
			expect(page('button#create').length).toEqual(1);
		});	
		
		describe('feedback section', function() {
			
			it('exists', function() {
				expect(page('#feedback').length).toEqual(1);
			});

			it('is hidden by default', function() {
				expect(page('#feedback').attr('class')).toContain('hidden');
			});

			describe('message placeholder', function() {

				it('exists', function() {
					expect(page('#feedback #message').length).toEqual(1);
				});

			});
			
			describe('link to newly created player', function() {

				it('exists', function() {
					expect(page('#feedback a#player-dashboard').length).toEqual(1);
				});

				it('is empty', function() {
					expect(page('#feedback a#player-dashboard').attr('href')).toEqual('');
				});

				it('invites to access to dashboard', function() {
					expect(page('#feedback a#player-dashboard').text().length).toBeGreaterThan(0);
				});

			});
		});
		
		describe('login feedback', function() {
		    
			it('exists', function() {
				expect(page('#login-feedback').length).toEqual(1);
			});

            it('is bad by default', function() {
				expect(page('#login-feedback').attr('class')).toContain('alert-danger');
            });
		});
				
	});
});