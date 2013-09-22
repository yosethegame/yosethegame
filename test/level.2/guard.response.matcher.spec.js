var matcher = require('../../public/level.2/guard.response.matcher');
var $ = require('jquery');

describe('Guard response matcher,', function() {

	var status;
	var remoteResponse;
	
	beforeEach(function() {
		remoteResponse = { headers: [] };
	});

	it('knows the expected content from the sent request', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=toto')).toEqual({
			number: 'toto',
			error: 'not a number'
		});
	});
	
});