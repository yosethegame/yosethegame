var matcher = require('./lib/first.fire.response.matcher');

var failWhenTheServerOfThePlayer = require('../challenge.common/fail.when.the.server.of.the.player');

describe('First fire response matcher,', function() {
	
	it('makes basic verifications of world Fire', function() {
		failWhenTheServerOfThePlayer.doesNotRespectTheInterfaceOfWorldFire(matcher);
	});
});