var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
require('./lib/create.player.controller');

describe('Display success', function() {
	
	var create;

    beforeEach(function() {
        create = new CreatePlayerController($);
		$('body').append('<section id="preview-feedback" class="alert-danger"><label></label></section>');
        create.displaySuccess();
    });
    
	afterEach(function() {
		$('#preview-feedback').remove();
	});

    it('removes class alert-danger', function() {
        expect($('#preview-feedback').attr('class')).not.toContain('alert-danger');
    });
    
    it('adds class alert-success', function() {
        expect($('#preview-feedback').attr('class')).toContain('alert-success');
    });
    
    it('informs the player', function() {
        expect($('#preview-feedback label').text()).toContain('Image found');
    });
});