var matcher = require('./lib/big.number.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Guard big number challenge,', function() {
	
	var request  = '***?number=123456789';
	var expected = { number : 123456789, error : 'too big number (>1e6)' };
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsAnswering(request).whenTheHeaderIsEmpty(matcher);
		failsAnswering(request).whenTheHeaderIsNotApplicationJson(matcher);		
	});
	
	it('passes when the expected answer is received', function() {
		passesAnswering(request).whenTheAnswerIs(expected, matcher);
		passesAnswering(request).whenTheAnswerIs({ error : 'too big number (>1e6)', number : 123456789 }, matcher);
	});

	it('fails when a different answer is received', function() {
		failsAnswering(request, expected).whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs('anything but json', matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ number: 'batman' }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ error : 'too big number (>1e6)' }, matcher);
		failsAnswering(request, expected).whenTheAnswerIs({ number : 'other', error : 'too big number (>1e6)' }, matcher);
	});
});