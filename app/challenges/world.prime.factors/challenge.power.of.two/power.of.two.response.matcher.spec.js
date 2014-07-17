var matcher = require('./lib/power.of.two.response.matcher');

describe('Power of two response matcher,', function() {

	it('knows the expected answer from the sent request', function() {
		expect(matcher.expectedContent('***?number=8')).toEqual({
			number: 8,
			decomposition: [2, 2, 2]
		});
	});
	
});