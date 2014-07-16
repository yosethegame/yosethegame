var matcher = require('./lib/ping.response.matcher');
var failWhenTheHeader = require('../common/fail.when.the.header');
var failWhenTheRemoteServer = require('../common/fail.when.the.remote.server');

describe('Ping challenge,', function() {
	
	it('expects a running remote server', function() {
		failWhenTheRemoteServer.doesNotAnswer(matcher);
	});
	
	it('is a json challenge', function() {
		failWhenTheHeader.isEmpty(matcher);
		failWhenTheHeader.isNotApplicationJson(matcher);
	});
	
});