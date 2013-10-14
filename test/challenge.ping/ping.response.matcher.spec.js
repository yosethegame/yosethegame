var matcher = require('../../public/challenge.ping/ping.response.matcher');

describe('Ping response matcher:', function() {

	var status;
	var remoteResponse;
	
	beforeEach(function() {
		remoteResponse = { headers: [] };
	});
	
	it('knows the expected answer from the sent request', function() {
		expect(matcher.expectedContent('this-url/ping')).toEqual({ alive: true });
	});
		
});