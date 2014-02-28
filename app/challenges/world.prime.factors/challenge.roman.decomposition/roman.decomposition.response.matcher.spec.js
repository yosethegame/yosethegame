var matcher = require('./lib/roman.decomposition.response.matcher');

describe('Roman decomposition response matcher,', function() {

	it('knows the expected answer from the sent request', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=XXI')).toEqual({
			number: "XXI",
			decomposition: ["III", "VII"]
		});
	});
	
});