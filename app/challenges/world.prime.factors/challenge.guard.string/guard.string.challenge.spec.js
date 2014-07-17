var matcher = require('./lib/guard.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');
var passesAnswering = require('../../common/passes.answering.request');

describe('Guard string challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsAnswering('***?number=batman').whenTheHeaderIsEmpty(matcher);
		failsAnswering('***?number=batman').whenTheHeaderIsNotApplicationJson(matcher);		
	});
	
	it('expect a specific json response', function() {
		passesAnswering('***?number=batman').whenTheAnswerIs({ number : 'batman', error : 'not a number' }, matcher);
		passesAnswering('***?number=batman').whenTheAnswerIs({ error : 'not a number', number : 'batman' }, matcher);

		failsAnswering('***?number=batman', { number : 'batman', error : 'not a number' }).whenTheAnswerIs({ value: 42 }, matcher);
		failsAnswering('***?number=batman', { number : 'batman', error : 'not a number' }).whenTheAnswerIs('anything but json', matcher);
		failsAnswering('***?number=batman', { number : 'batman', error : 'not a number' }).whenTheAnswerIs({ number: 'batman' }, matcher);
		failsAnswering('***?number=batman', { number : 'batman', error : 'not a number' }).whenTheAnswerIs({ error : 'not a number' }, matcher);
		failsAnswering('***?number=batman', { number : 'batman', error : 'not a number' }).whenTheAnswerIs({ number : 'other', error : 'not a number' }, matcher);
	});
});