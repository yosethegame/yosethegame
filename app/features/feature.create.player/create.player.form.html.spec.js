var form	= require('./lib/create.player.request');
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
        
        it('has a specific form to post the info of the new player', function() {
            expect(page('form[method="post"][action="/create-player"]#create-player-form').length).toEqual(1);
        });

		it('has an input field for the login', function() {			
			expect(page('input[name="login"]#login').length).toEqual(1);
		});		
		
		describe('avatar input field', function() {

            it('exists', function() {
                expect(page('input[name="avatar"]#avatar').length).toEqual(1);
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