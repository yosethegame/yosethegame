var form	= require('../../public/feature.settings/display.settings.request');
var cheerio = require('cheerio');

describe('Settings form', function() {
	
	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	
	describe('The elements of the page:', function() {

		beforeEach(function() {	
			form( { url: '/players/ericminio/settings' }, 
			      response, 
			      { players: [ { login: 'ericminio', avatar: 'http://old-avatar' } ] } );
			page = cheerio.load(response.html);
		});

		describe('avatar input field', function() {
		    
    		it('exists', function() {			
    			expect(page('input#avatar-url').length).toEqual(1);
    		});	
    		
    		it('proposes old value', function() {
    		   expect(page('input#avatar-url').attr('value')).toEqual('http://old-avatar'); 
    		});

		});
		
		it('has a button to trigger the save', function() {
			expect(page('button#save-settings-button').length).toEqual(1);
		});	
						
	});
});