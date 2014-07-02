var matcher = require('./lib/emergency.response.matcher');

var failWhenTheServerOfThePlayer = require('../challenge.common/fail.when.the.server.of.the.player');

describe('Emergency response matcher,', function() {
	
	it('makes basic verifications of world Fire', function() {
		failWhenTheServerOfThePlayer.doesNotRespectTheInterfaceOfWorldFire(matcher);
	});
});