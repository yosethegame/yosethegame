var LevelPingListener = require('../../public/challenge.ping/try.listener.js');
var $ = require('jquery');

describe("TryListener: ", function() {

	var listener = new LevelPingListener();
	
	it("publish expected value from remote server", function() {
		expect(LevelPingListener.expectedAnswer).toEqual(JSON.stringify({ alive: true }));
	});
	
	it("send a get request to the chosen server", function() {
		$('<input id="server" />').appendTo('body');
		$('#server').val('any');
		spyOn($, 'get').andCallThrough();
		listener.try();
		
		expect($.get).toHaveBeenCalledWith('/ping?server=any');
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