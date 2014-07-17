var matcher = require('./lib/power.of.two.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Power of two challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('is a dynamic json challenge', function() {
		failsAnswering('***?number=42').whenTheHeaderIsEmpty(matcher);
		failsAnswering('***?number=42').whenTheHeaderIsNotApplicationJson(matcher);
		
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] })
                       .whenTheAnswerIs('anything but json', matcher);
	});
	
	it('expect a specific response', function() {
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] })
                       .whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] })
                       .whenTheAnswerIs({ number: 42, decomposition: [2, 3] }, matcher);

		passesAnswering('***?number=42').whenTheAnswerIs({ number: 42, decomposition: [2, 3, 7] }, matcher);
		passesAnswering('***?number=42').whenTheAnswerIs({ decomposition: [2, 3, 7], number: 42 }, matcher);
		
		passesAnswering('***?number=42').WhenTheAnswerIsWithExtraCarriageReturn({ number: 42, decomposition: [2, 3, 7] }, matcher);
	});
	
});