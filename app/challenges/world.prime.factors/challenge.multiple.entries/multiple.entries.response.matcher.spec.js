var matcher = require('./lib/multiple.entries.response.matcher');
var passesAnswering = require('../../common/passes.answering.request');

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
    
	it('passes when the expected answer is received', function() {
		passesAnswering('***?number=15&number=6').whenTheAnswerIs(
			[
				{
					number: 15,
					decomposition: [3, 5]
				},
				{
					number: 6,
					decomposition: [2, 3]
				},
			], matcher);
        
    	passesAnswering('***?number=15&number=hello').whenTheAnswerIs(
			[
				{
					number: 15,
					decomposition: [3, 5]
				},
				{
					number: "hello",
					error: "not a number"
				},
			], matcher);
	});
	
});