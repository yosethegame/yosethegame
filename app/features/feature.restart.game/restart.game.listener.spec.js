const { JSDOM } = require("jsdom");
var $ = require('jquery')(new JSDOM().window);
var Restart = require('./lib/restart.game.listener');

describe("Restart game listener: ", function() {

	var restart = new Restart($);

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

    it('reloads window.location when success', function() {
        window = {
            location : {
                reload: function() {}
            }
        };
        spyOn(window.location, 'reload');
        restart.reload();

        expect(window.location.reload).toHaveBeenCalledWith(true);
    });

});
