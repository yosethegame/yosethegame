var matcher = require('./lib/guard.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Guard string challenge,', function() {
	
	var request  = '***?number=batman';
	var expected = { number : 'batman', error : 'not a number' };
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsAnswering(request).whenTheHeaderIsEmpty(matcher);
		failsAnswering(request).whenTheHeaderIsNotApplicationJson(matcher);		
	});
	
	it('passes when the expected answer is received', function() {
		passesAnswering(request).whenTheAnswerIs(expected, matcher);
		passesAnswering(request).whenTheAnswerIs({ error : 'not a number', number : 'batman' }, matcher);
	});

	it('fails when a different answer is received', function() {
		failsAnswering(request, expected).whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs('anything but json', matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ number: 'batman' }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ error : 'not a number' }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ number : 'other', error : 'not a number' }, matcher);
	});
});