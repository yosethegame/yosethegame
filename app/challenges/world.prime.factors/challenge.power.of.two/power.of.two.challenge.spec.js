var matcher = require('./lib/power.of.two.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Power of two challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsAnswering('***?number=4').whenTheHeaderIsEmpty(matcher);
		failsAnswering('***?number=4').whenTheHeaderIsNotApplicationJson(matcher);
	});
	
	it('passes when the expected answer is received', function() {
		passesAnswering('***?number=4').whenTheAnswerIs({ number: 4, decomposition: [2, 2] }, matcher);
		passesAnswering('***?number=4').whenTheAnswerIs({ decomposition: [2, 2], number: 4 }, matcher);		
		passesAnswering('***?number=4').WhenTheAnswerIsWithExtraCarriageReturn({ number: 4, decomposition: [2, 2] }, matcher);
	});
	
	it('fails when a different answer is received', function() {
		failsAnswering('***?number=4', { number: 4, decomposition: [2, 2] }).whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering('***?number=4', { number: 4, decomposition: [2, 2] }).whenTheAnswerIs({ number: 4, decomposition: [2, 3] }, matcher);
		failsAnswering('***?number=4', { number: 4, decomposition: [2, 2] }).whenTheAnswerIs({ number: 42, decomposition: [2, 2] }, matcher);
		failsAnswering('***?number=4', { number: 4, decomposition: [2, 2] }).whenTheAnswerIs('anything but json', matcher);
	});
});