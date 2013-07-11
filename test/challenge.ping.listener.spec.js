var LevelPingListener = require('../public/js/challenge.ping.listener.js');
var $ = require('jquery');

describe("LevelPingListener", function() {

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
	
	describe("status message update", function() {
				
		var message;
		
		beforeEach(function() {
			$('<label id="status" />').appendTo('body');
			message = $('#status');
		});

		describe("when done", function() {

			it("success when receiving the expected value", function() {			
				listener.success(LevelPingListener.expectedAnswer);

				expect(message.text()).toEqual('success!');
			});

			it("error when receiving an unexpected value", function() {			
				listener.success('any');

				expect(message.text()).toEqual('fail :(: should return ' + LevelPingListener.expectedAnswer);
			});
		});

		describe("when error", function() {

			it("notify that server is not responding", function() {			
				listener.error();

				expect(message.text()).toEqual('fail :(: server not responding(404)');
			});
		});
	});
});