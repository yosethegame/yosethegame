const { JSDOM } = require("jsdom");
var $ = require('jquery')(new JSDOM().window);
require('./lib/create.player.controller');

describe('Success getting avatar', function() {

	var create;

    beforeEach(function() {
        create = new CreatePlayerController($);
    });

    it('displays error when the received content is not an image', function() {
        var jqXHR = { getAllResponseHeaders: function() { return 'Content-Type: anything'; } };
        spyOn(create, 'displayError');
        create.succesGettingAvatar(null, null, jqXHR);

        expect(create.displayError).toHaveBeenCalled();
    });

    it('displays success when the received content is an image', function() {
        var jqXHR = { getAllResponseHeaders: function() { return 'Content-Type: image'; } };
        spyOn(create, 'displaySuccess');
        create.succesGettingAvatar(null, null, jqXHR);

        expect(create.displaySuccess).toHaveBeenCalled();
    });
});
