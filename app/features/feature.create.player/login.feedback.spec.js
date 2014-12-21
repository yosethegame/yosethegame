var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var CreatePlayerController = require('./lib/create.player.controller');

describe('Login feedback:', function() {
	
	var create;

    describe('when login is correct,', function() {
    
        beforeEach(function() {
            create = new CreatePlayerController($);
            create.isLoginCorrect = function() { return true; };
    		$('body').append('<section id="login-feedback" class="alert-danger"><label></label></section>');
            create.updateLoginFeedback();
        });
        
    	afterEach(function() {
    		$('#login-feedback').remove();
    	});
    
        it('removes class danger', function() {
            expect($('#login-feedback').attr('class')).not.toContain('alert-danger');
        });
        
        it('adds class success', function() {
            expect($('#login-feedback').attr('class')).toContain('alert-success');
        });
        
        it('informs the player', function() {
            expect($('#login-feedback label').text()).toEqual('Login correct');
        });
    });

    describe('when login is incorrect,', function() {
    
        beforeEach(function() {
            create = new CreatePlayerController($);
            create.isLoginCorrect = function() { return false; };
    		$('body').append('<section id="login-feedback" class="alert-success"><label></label></section>');
            create.updateLoginFeedback();
        });
        
    	afterEach(function() {
    		$('#login-feedback').remove();
    	});
        
        it('removes class success', function() {
            expect($('#login-feedback').attr('class')).not.toContain('alert-success');
        });
        
        it('adds class danger', function() {
            expect($('#login-feedback').attr('class')).toContain('alert-danger');
        });
        
        it('informs the player', function() {
            expect($('#login-feedback label').text()).toEqual('Login incorrect. Must match ' + create.regex);
        });
    });
});