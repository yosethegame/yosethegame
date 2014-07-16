var matcher = require('./lib/ping.response.matcher');
var failsWhenTheHeader = require('../common/fails.when.the.header');
var failsWhenTheRemoteServer = require('../common/fails.when.the.remote.server');
var failsWhenTheReceivedContent = require('../common/fails.when.the.received.content');
var passesWhenTheReceivedContent = require('../common/passes.when.the.received.content');

describe('Ping challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('is a json challenge', function() {
		failsWhenTheHeader.isEmpty(matcher);
		failsWhenTheHeader.isNotApplicationJson(matcher);
	});
	
	it('expects a specific static response', function() {
		failsWhenTheReceivedContent.isNot({alive:true}, matcher);
		passesWhenTheReceivedContent.is({alive:true}, matcher);
	});
	
});