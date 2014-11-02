var form	= require('./lib/display.settings.request');
var cheerio = require('cheerio');
var Data	= require('../../support/database.with.levels');

describe('Settings form', function() {
	
	var database = new Data();
	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	
	describe('The elements of the page:', function() {

		beforeEach(function() {	
            database.players = [ { login: 'ericminio', avatar: 'http://old-avatar', tags: 'épicurien Québec' } ];
			form( { url: '/players/ericminio/settings' }, response, database );
			page = cheerio.load(response.html);
		});
		
		describe('login label', function() {

            it('exists', function() {			
                expect(page('#login').length).toEqual(1);
            });		

            it('displays', function() {			
                expect(page('#login').text()).toEqual('ericminio');
            });
		});

		describe('avatar input field', function() {

            it('exists', function() {			
                expect(page('input#avatar-url').length).toEqual(1);
            });	

            it('proposes old value', function() {
                expect(page('input#avatar-url').attr('value')).toEqual('http://old-avatar'); 
            });

		});
		
		describe('tags input field', function() {

            it('exists', function() {			
                expect(page('input#tags').length).toEqual(1);
            });	

            it('proposes old value', function() {
                expect(page('input#tags').attr('value')).toEqual('épicurien Québec'); 
            });

		});
		
        describe('Save settings button', function() {

            it('exists', function() {
                expect(page('button#save-settings-button').length).toEqual(1);
            });	

            it('calls local javascript', function() {
                expect(page('button#save-settings-button').attr('onclick')).toEqual('new SaveSettings($).go()');
            });

            it('calls an existing script', function() {
                expect(page.html('body')).toContain('<script src="/features/feature.settings/lib/save.settings.listener.js"></script>');
            });

        });

		describe('preview avatar', function() {
            
            it('exists', function() {			
                expect(page('#avatar-preview').length).toEqual(1);
            });	

            it('is initialzed with old value', function() {
                expect(page('#avatar-preview').attr('src')).toEqual('http://old-avatar');
            });

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
			
			describe('link to dashboard of player', function() {

				it('exists', function() {
					expect(page('#feedback a#player-dashboard').length).toEqual(1);
				});

				it('targets the dashboard', function() {
					expect(page('#feedback a#player-dashboard').attr('href')).toEqual('/players/ericminio');
				});

				it('invites to access to dashboard', function() {
					expect(page('#feedback a#player-dashboard').text().length).toBeGreaterThan(0);
				});

			});
		});			
	});
});