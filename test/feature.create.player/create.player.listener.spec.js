var $ = require('jquery');
var CreatePlayerListener = require('../../public/feature.create.player/create.player.listener');

describe('Create player listener', function() {
	
	var create = new CreatePlayerListener();
	
	describe('Request sent', function() {
		
		beforeEach(function() {
			$('body').append('<input id="login" />');
			$('body').append('<input id="avatar" />');
		});

		afterEach(function() {
			$('#login').remove();
			$('#avatar').remove();
		});

		it("send a post request with the player's infos", function() {
			$('#login').val('eric');
			$('#avatar').val('avatar-of-eric');
			spyOn($, 'post').andCallThrough();
			create.player();

			expect($.post).toHaveBeenCalledWith('/create-player', { login: 'eric', avatar: 'avatar-of-eric' } );
		});

	});
		
});