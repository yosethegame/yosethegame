var matcher = require('./lib/ping.response.matcher');
var failWhenTheHeader = require('../common/fail.when.the.header');
var failWhenTheRemoteServer = require('../common/fail.when.the.remote.server');
var failWhenTheReceivedContent = require('../common/fail.when.the.received.content');
var passWhenTheReceivedContent = require('../common/pass.when.the.received.content');

describe('Ping challenge,', function() {
	
	it('expects a running remote server', function() {
		failWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('is a json challenge', function() {
		failWhenTheHeader.isEmpty(matcher);
		failWhenTheHeader.isNotApplicationJson(matcher);
	});
	
	it('expects a specific static response', function() {
		failWhenTheReceivedContent.isNot({alive:true}, matcher);
		passWhenTheReceivedContent.is({alive:true}, matcher);
	});
	
});