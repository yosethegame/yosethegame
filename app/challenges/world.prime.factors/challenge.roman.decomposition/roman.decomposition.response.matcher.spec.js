var matcher = require('./lib/roman.decomposition.response.matcher');
var passesAnswering = require('../../common/passes.answering.request');

describe('Roman decomposition response matcher,', function() {

	it('knows the expected answer from the sent request', function() {
		expect(matcher.expectedContent('this-url/primeFactors?number=XXI')).toEqual({
			number: "XXI",
			decomposition: ["III", "VII"]
		});
	});
	
	it('passes when the expected answer is received', function() {
		passesAnswering('***?number=XXI').whenTheAnswerIs({
			number: "XXI",
			decomposition: ["III", "VII"]
		}, matcher);	
	});
});