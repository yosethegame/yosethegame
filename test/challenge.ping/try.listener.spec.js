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
			$('<label id="status" />').appendTo('body');
			message = $('#status');
		});
		
		describe("when success", function() {

			it("displays a success message", function() {			
				listener.success();

				expect(message.text()).toEqual('success!');
			});

		});

		describe("when error", function() {

			it("notify that server is not responding when 404", function() {			
				listener.error({ status: 404, responseText: '' });

				expect(message.text()).toEqual('404: server not responding');
			});
			
			it("display error message when 501", function() {			
				listener.error({ status: 501, responseText: 'any' });

				expect(message.text()).toEqual('501: any');
			});
		});
	});
});