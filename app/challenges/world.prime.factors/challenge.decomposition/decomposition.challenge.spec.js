var matcher = require('./lib/decomposition.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Decomposition challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsAnswering('***?number=42').whenTheHeaderIsEmpty(matcher);
		failsAnswering('***?number=42').whenTheHeaderIsNotApplicationJson(matcher);
	});
	
	it('passes when the expected answer is received', function() {
		passesAnswering('***?number=42').whenTheAnswerIs({ number: 42, decomposition: [2, 3, 7] }, matcher);
		passesAnswering('***?number=42').whenTheAnswerIs({ decomposition: [2, 3, 7], number: 42 }, matcher);		
		passesAnswering('***?number=42').WhenTheAnswerIsWithExtraCarriageReturn({ number: 42, decomposition: [2, 3, 7] }, matcher);
	});
	
	it('fails when a different answer is received', function() {
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] }).whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] }).whenTheAnswerIs({ number: 42, decomposition: [2, 3] }, matcher);
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] }).whenTheAnswerIs({ number: 420, decomposition: [2, 3] }, matcher);
		failsAnswering('***?number=42', { number: 42, decomposition: [2, 3, 7] }).whenTheAnswerIs('anything but json', matcher);
	});
});