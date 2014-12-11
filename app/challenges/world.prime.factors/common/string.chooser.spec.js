var Chooser = require('./lib/string.chooser');

describe('String chooser', function() {

	var chooser = new Chooser();
	
	it('chooses a string', function() {
		expect(typeof(chooser.getString())).toEqual('string');
	});
	
	it('chooses randomly', function() {
		var remainingAttempt = 5;
		var first = chooser.getString();
		var different = false;
		while (remainingAttempt > 0) {
			remainingAttempt --;
            different = different || (chooser.getString() !== first);
		}
		
		expect(different).toEqual(true);
	});
	
});