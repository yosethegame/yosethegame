var matcher = require('./lib/decomposition.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Decomposition challenge,', function() {
	
	var request  = '***?number=42';
	var expected = { number: 42, decomposition: [2, 3, 7] };
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsAnswering(request).whenTheHeaderIsEmpty(matcher);
		failsAnswering(request).whenTheHeaderIsNotApplicationJson(matcher);
	});
	
	it('passes when the expected answer is received', function() {
		passesAnswering(request).whenTheAnswerIs(expected, matcher);
		passesAnswering(request).whenTheAnswerIs({ decomposition: [2, 3, 7], number: 42 }, matcher);		
	});
	
	it('fails when a different answer is received', function() {
		failsAnswering(request, expected).whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ number: 42, decomposition: [2, 3] }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ number: 420, decomposition: [2, 3] }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs('anything but json', matcher);
	});
});