var LevelPingListener = require('../public/js/level.ping.listener.js');
var $ = require('jquery');

describe("LevelPingListener", function() {

	it("publish expected value from remote server", function() {
		expect(LevelPingListener.expectedAnswer).toEqual(JSON.stringify({ alive: true }));
	});
	
	describe("status message update", function() {
		
		var listener = new LevelPingListener();
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