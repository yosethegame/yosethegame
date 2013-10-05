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

			expect($.post).toHaveBeenCalledWith('/create-player', { login: 'eric', avatar: 'avatar-of-eric' }, create.success);
		});

	});
	
	describe('Success', function() {
		
		beforeEach(function() {
			$('body').append( '' +
				'<input id="login" />' +
				'<section id="feedback" class="hidden" >' +
					'<a id="player-dashboard" href="" />' +
				'</section>'
			);
		});

		afterEach(function() {
			$('#player-dashboard').remove();
			$('#feedback').remove();
			$('#login').remove();
		});
		
		it('makes visible the feedback section', function() {
			create.success();
			
			expect($('#feedback').attr('class')).toContain('visible');
		});

		it('sets the dashboard link', function() {
			$('#login').val('bilou');
			create.success();
			
			expect($('a#player-dashboard').attr('href')).toEqual('/players/bilou')
		});
	});
		
});