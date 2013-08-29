var LevelPingListener = require('../../public/challenge.ping/try.listener.js');
var $ = require('jquery');

describe("TryListener: ", function() {

	var listener = new LevelPingListener();
	
	it("publish expected value from remote server", function() {
		expect(LevelPingListener.expectedAnswer).toEqual(JSON.stringify({ alive: true }));
	});
	
	describe('Request sent:', function() {
	
		beforeEach(function() {
			$('body').append('<div id="player" class="visible"><label id="login">eric</label></div>');
			$('body').append('<input id="server"/>');			
		});
		
		afterEach(function() {
			$('#login').remove();
			$('#server').remove();
			$('#player').remove();
		});
		
		it("send a get request to the chosen server", function() {
			$('#server').val('any');
			spyOn($, 'get').andCallThrough();
			listener.try();

			expect($.get).toHaveBeenCalledWith('/ping?login=eric&server=any');
		});
	});
		
	describe('Animation', function() {
		var post;
	
		beforeEach(function() {
			$('body').append('<img id="avatar" />');

			$('body').append('<input id="server"/>');
			$('#server').val('any');
			spyOn($, 'get').andCallThrough();
		});
		
		afterEach(function() {
			$('#server').remove();
			$('#avatar').remove();			
		});
		
		it('starts when a try is attempted', function() {
			listener.try();
			expect($('#avatar').attr('class')).toContain('rotate');
		});
		
		it('stops when success', function() {
			$('#avatar').addClass('rotate');
			listener.success();
			expect($('#avatar').attr('class')).toNotContain('rotate');
		});
		
	});
	
	describe('When success and a player is logged,', function() {
	
		var post;
	
		beforeEach(function() {
			$('body').append('<div id="player" class="visible"><label id="login">eric</label></div>');
			$('body').append('<div id="continue" class="hidden"></div>');

			$('body').append('<input id="server"/>');
			$('#server').val('any');
			spyOn($, 'ajax');
			listener.success();			
			
			post = $.ajax.mostRecentCall.args[0];
		});
		
		afterEach(function() {
			$('#login').remove();
			$('#server').remove();
			$('#player').remove();
			$('#continue').remove();
		});
	
		it('notifies the success', function() {
			expect(post.url).toBe('/success');
		});
		
		it('sends the challenge file name to identify the challenge', function() {
			var name = 'public/challenge.ping/ping.html';
			if (!require('fs').existsSync(name)) { this.fail(Error('challenge file has moved')); }
			
			expect(post.data.challenge).toBe(name);
		});
		
		it('sends the login of the player', function() {
			expect(post.data.login).toBe('eric');
		});
		
		it('sends the server given by the player', function() {
			expect(post.data.server).toBe('any');
		});
		
		it('displays the invitation to continue', function() {
			expect($('#continue').attr('class')).toContain('visible');
		});
		
	});
	
	describe('When success and nobody seems to be logged', function() {

		var post;
	
		beforeEach(function() {
			$('body').append('<div id="continue" class="hidden"></div>');
			$('body').append('<input id="server"/>');
			$('#server').val('any');
			spyOn($, 'ajax');
			listener.success();			
		});
		
		afterEach(function() {
			$('#server').remove();
			$('#continue').remove();
		});

		it('the invitation to continue remains hidden', function() {
			expect($('#continue').attr('class')).toContain('hidden');
		});
		
	});
	
	describe("status message update: ", function() {
				
		var message;
		
		beforeEach(function() {
			$('<label id="success_section" class="hidden"></label>').appendTo('body');
			$('<label id="error_section" class="hidden"></label>').appendTo('body');
			
			$('<label id="success">previous</label>').appendTo('body');

			$('<label id="error">previous</label>').appendTo('body');
			$('<label id="expected">previous</label>').appendTo('body');
			$('<label id="got">previous</label>').appendTo('body');
		});
		
		describe("when success, ", function() {

			beforeEach(function() {
				listener.success();				
			});
			
			it("displays the success section", function() {
				expect($('#success_section').hasClass('hidden')).toBe(false);
			});
			
			it("hides the error section", function() {
				expect($('#error_section').hasClass('hidden')).toBe(true);
			})

			it("displays a success message", function() {			
				expect($('#success').text()).toEqual('success!');
			});
			
			it("clears all error-related placeholders", function() {
				expect($('#error').text()).toEqual('');
				expect($('#expected').text()).toEqual('');
				expect($('#got').text()).toEqual('');				
			});

		});

		describe("when 404, ", function() {

			beforeEach(function() {
				listener.error({ status: 404 });
			});

			it("displays the error section", function() {
				expect($('#error_section').hasClass('hidden')).toBe(false);
			});
			
			it("hides the success section", function() {
				expect($('#success_section').hasClass('hidden')).toBe(true);
			})

			it("displays the error message", function() {			
				expect($('#error').text()).toEqual('error 404');
			});

			it("clears the other placeholders", function() {
				expect($('#success').text()).toEqual('');
				
				expect($('#expected').text()).toEqual('');
				expect($('#got').text()).toEqual('');				
			});
		});
		
		describe("when 501, ", function() {
			
			beforeEach(function() {
				listener.error({ 
					status: 501, 
					responseText: JSON.stringify({
						expected: {
								'content-type': 'application/json',
								body: { alive: true }
							},
							got: {
								'content-type': 'unexpected content-type',
								body: 'unexpected content'
							}
						})
				});
			});
			
			it("clears success placeholder", function() {
				expect($('#success').text()).toEqual('');
			});
			
			it("displays error message", function() {			
				expect($('#error').text()).toEqual('error 501');
			});
			
			it("displays the expected value", function() {
				expect($('#expected').text()).toEqual(JSON.stringify({
					'content-type': 'application/json',
					body: { alive: true }
				}));
			});
			
			it("displays the actual value", function() {
				expect($('#got').text()).toEqual(JSON.stringify({
					'content-type': 'unexpected content-type',
					body: 'unexpected content'
				}));
			});
		});
	});
});