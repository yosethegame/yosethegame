var matcher = require('./lib/first.fire.response.matcher');

var json200 = require('../../common/lib/json200');
var failWhenTheMoves = require('../challenge.common/fail.when.the.moves');

describe('When the answer contains the correct map,', function() {
    
	it('makes moves-related verifications', function() {
		failWhenTheMoves.areMissing(matcher);
		failWhenTheMoves.areActuallyAString(matcher);
		failWhenTheMoves.areActuallyANumber(matcher);
		failWhenTheMoves.areMissingOneDxOrOneDy(matcher);
		failWhenTheMoves.haveUnauthorizedOffsets(matcher);
	});    
});