var matcher = require('./lib/guard.response.matcher');
var failsWhenTheRemoteServer = require('../../common/fails.when.the.remote.server');
var failsAnswering = require('../../common/fails.answering.request');

describe('Guard string challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('is a dynamic json challenge', function() {
		failsAnswering('***?number=batman').whenTheHeaderIsEmpty(matcher);
		failsAnswering('***?number=batman').whenTheHeaderIsNotApplicationJson(matcher);
		failsAnswering('***?number=batman').whenTheResponseIsNotInJsonFormat(matcher);
	});
});