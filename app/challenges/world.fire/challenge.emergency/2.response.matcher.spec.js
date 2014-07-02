var matcher = require('./lib/emergency.response.matcher');

var failWhenTheServerOfThePlayer = require('../challenge.common/fail.when.the.server.of.the.player');

describe('Emergency response matcher,', function() {
	
	it('makes basic verifications of world Fire', function() {
		failWhenTheServerOfThePlayer.doesNotRespectTheInterfaceOfWorldFire(matcher);
	});
	
	it('knows the candidates of the requester', function() {
		var Requester = require('./lib/emergency.requester');
		var requester = new Requester();
		var matcherCandidates = require('./lib/emergency.response.matcher').candidates;

		expect(matcherCandidates).toEqual(requester.candidates);
	});
});