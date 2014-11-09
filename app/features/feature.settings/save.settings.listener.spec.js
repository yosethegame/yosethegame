var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var SaveSettings = require('./lib/save.settings.listener');

describe('Save settings listener', function() {
	
	var listener = new SaveSettings($);
	
	describe('Request sent', function() {
		
		beforeEach(function() {
			$('body').append('<label id="login" />');
			$('body').append('<input id="avatar-url" />');
			$('body').append('<input id="tags" />');
		});

		afterEach(function() {
			$('#login').remove();
			$('#avatar-url').remove();
			$('#tags').remove();
		});

		it("send a post request with the player's infos", function() {
			$('#login').text('eric');
			$('#avatar-url').val('avatar-of-eric');
			$('#tags').val('tags of eric');
			spyOn($, 'post').andCallThrough();
			listener.go();

			expect($.post).toHaveBeenCalledWith('/save-settings', { login: 'eric', avatar: 'avatar-of-eric', tags: 'tags of eric' }, listener.success);
		});

	});
	
	describe('Success', function() {
		
		beforeEach(function() {
			$('body').append( '<section id="feedback" class="hidden" />' );
		});

		afterEach(function() {
			$('#feedback').remove();
		});
		
		it('makes visible the feedback section', function() {
			listener.success();
			
			expect($('#feedback').attr('class')).toContain('visible');
		});

	});
		
});