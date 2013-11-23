var $ = require('jquery');
var SaveSettings = require('../../public/feature.settings/save.settings.listener');

describe('Save settings listener', function() {
	
	var listener = new SaveSettings();
	
	describe('Request sent', function() {
		
		beforeEach(function() {
			$('body').append('<label id="login" />');
			$('body').append('<input id="avatar-url" />');
		});

		afterEach(function() {
			$('#login').remove();
			$('#avatar-url').remove();
		});

		it("send a post request with the player's infos", function() {
			$('#login').text('eric');
			$('#avatar-url').val('avatar-of-eric');
			spyOn($, 'post').andCallThrough();
			listener.go();

			expect($.post).toHaveBeenCalledWith('/save-settings', { login: 'eric', avatar: 'avatar-of-eric' });
		});

	});
		
});