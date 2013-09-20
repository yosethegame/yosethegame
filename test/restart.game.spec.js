var $ = require('jquery');
var Restart = require('../public/js/restart.game.listener');

describe("Restart game listener: ", function() {

	var restart = new Restart();
	
	beforeEach(function() {
		$('body').append('<label id="login">eric</label>');
	});
	
	afterEach(function() {
		$('#login').remove();
	});
	
	describe('Request sent:', function() {
	
		it("send a get request to the chosen server", function() {
			spyOn($, 'get').andCallThrough();
			restart.game();

			expect($.get).toHaveBeenCalledWith('/restart-game?login=eric');
		});
	});
});