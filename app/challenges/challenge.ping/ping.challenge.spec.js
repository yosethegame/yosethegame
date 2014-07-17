var matcher = require('./lib/ping.response.matcher');
var failsWhenTheHeader = require('../common/fails.when.the.header');
var failsWhenTheRemoteServer = require('../common/fails.when.the.remote.server');
var failsWhenTheReceivedContent = require('../common/fails.when.the.received.content');
var passesWhenTheReceivedContent = require('../common/passes.when.the.received.content');

describe('Ping challenge,', function() {
	
	it('expects a running remote server', function() {
		failsWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('expects a json header', function() {
		failsWhenTheHeader.isEmpty(matcher);
		failsWhenTheHeader.isNotApplicationJson(matcher);
	});
	
	it('passes when the expected answer is received', function() {
		passesWhenTheReceivedContent.is({alive:true}, matcher);
	});
	
	it('fails when a different answer is received', function() {
		failsWhenTheReceivedContent.is({alive:false}, matcher);
		failsWhenTheReceivedContent.is('anything', matcher);
	});
});