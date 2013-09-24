var matcher = require('../../public/challenge.guard.big.number/big.number.response.matcher');
var $ = require('jquery');

describe('Big number guard response matcher,', function() {

	var status;
	var remoteResponse;
	
	beforeEach(function() {
		remoteResponse = { headers: [] };
	});

	it('knows the expected content from the sent request', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=3000000')).toEqual({
			number: 3000000,
			error: 'too big number (>1e6)'
		});
	});
	
});