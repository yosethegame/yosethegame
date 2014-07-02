var matcher = require('./lib/get.water.fast.response.matcher');

var failWhenTheServerOfThePlayer = require('../challenge.common/fail.when.the.server.of.the.player');

describe('Get water fast response matcher,', function() {
	
	it('makes basic verifications of world Fire', function() {
		failWhenTheServerOfThePlayer.doesNotRespectTheInterfaceOfWorldFire(matcher);
	});
});