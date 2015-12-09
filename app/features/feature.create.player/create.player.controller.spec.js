var $ = require('jquery')(require("jsdom").jsdom().defaultView);
require('./lib/create.player.controller');

describe('Create player listener:', function() {

	describe('Form', function() {

    	var create;

		beforeEach(function() {
			$('body').append('<input id="login" />');
			$('body').append('<form id="create-player-form" />');
            create = new CreatePlayerController($);
		});

		afterEach(function() {
			$('#login').remove();
			$('#create-player-form').remove();
		});

        it('is kept for later use', function() {
            expect(create.form).toEqual($('#create-player-form'));
        });

        it('is not submited when the login is not correct', function() {
			$('#login').val('eric mignot');
            spyOn(create.form, 'submit');
			create.player();

            expect(create.form.submit).not.toHaveBeenCalled();
        });

        it('is submitted when the login is correct', function() {
			$('#login').val('eric');
            spyOn(create.form, 'submit');
			create.player();

            expect(create.form.submit).toHaveBeenCalled();
        });
	});

	describe('Login correctness', function() {

    	var create;

		beforeEach(function() {
            create = new CreatePlayerController($);
			$('body').append('<input id="login" />');
		});

		afterEach(function() {
			$('#login').remove();
		});

        it('is not correct when empty', function() {
            $('#login').val('');

            expect(create.isLoginCorrect()).toEqual(false);
        });

        it('is not correct with blanks', function() {
            $('#login').val('  ');

            expect(create.isLoginCorrect()).toEqual(false);
        });

        it('is correct with numbers and letters', function() {
            $('#login').val('eric42');

            expect(create.isLoginCorrect()).toEqual(true);
        });

        it('is correct with dashes', function() {
            $('#login').val('eric-mignot');

            expect(create.isLoginCorrect()).toEqual(true);
        });

        it('is correct with dots', function() {
            $('#login').val('eric.mignot');

            expect(create.isLoginCorrect()).toEqual(true);
        });

        it('is correct when it is an e-mail', function() {
            $('#login').val('eric.mignot@gmail.com');

            expect(create.isLoginCorrect()).toEqual(true);
        });

        it('is incorrect when not matching expected pattern', function() {
            $('#login').val('2&é""');

            expect(create.isLoginCorrect()).toEqual(false);
        });
	});
});
