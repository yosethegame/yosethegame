const { JSDOM } = require("jsdom");
var $ = require('jquery')(new JSDOM().window);
require('./lib/create.player.controller');

describe('Update preview', function() {

	var create;

    beforeEach(function() {
        create = new CreatePlayerController($);
		$('body').append('<img id="avatar-preview" src=""></section><input id="avatar" value="this-avatar">');
        create.updatePreview();
    });

	afterEach(function() {
		$('#login-feedback').remove();
	});

    it('sets image source', function() {
        expect($('#avatar-preview').attr('src')).toEqual('this-avatar');
    });

});
