var LevelPingListener = require('../public/js/level.ping.listener.js');

describe("LevelPingListener", function() {

	it("publish value statically", function() {
		expect(LevelPingListener.expectedAnswer).toEqual(JSON.stringify({ alive: true }));
	});
});