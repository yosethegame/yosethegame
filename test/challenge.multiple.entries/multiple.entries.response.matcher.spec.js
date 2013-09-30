var matcher = require('../../public/challenge.multiple.entries/multiple.entries.response.matcher');

describe('Multiple entries response matcher,', function() {

	it('knows the expected answer for one number', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=300')).toEqual({
			number: 300,
			decomposition: [2, 2, 3, 5, 5]
		});
	});
	
	it('knows the expected answer for two numbers', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=15&number=6')).toEqual(
			[
				{
					number: 15,
					decomposition: [3, 5]
				},
				{
					number: 6,
					decomposition: [2, 3]
				},
			]);
	});
	
});