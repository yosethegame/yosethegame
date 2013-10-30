var matcher = require('../../../public/world.prime.factors/challenge.multiple.entries/multiple.entries.response.matcher');

describe('Multiple entries response matcher,', function() {

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
	
	it('knows the expected answer for a string', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=15&number=hello')).toEqual(
			[
				{
					number: 15,
					decomposition: [3, 5]
				},
				{
					number: "hello",
					error: "not a number"
				},
			]);
	});
	
});