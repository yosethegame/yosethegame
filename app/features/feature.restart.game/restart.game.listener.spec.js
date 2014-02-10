var $ = require('jquery');
var Restart = require('./lib/restart.game.listener');

describe("Restart game listener: ", function() {

	var restart = new Restart();
	
	beforeEach(function() {
		$('body').append('<label id="login">eric</label>');
	});
	
	afterEach(function() {
		$('#login').remove();
	});
	
	it("sends a get request to the chosen server", function() {
		spyOn($, 'get').andCallThrough();
		restart.game();

		expect($.get).toHaveBeenCalledWith('/restart-game?login=eric');
	});

});