var Chooser = require('./lib/integer.chooser');

describe('Power of two chooser', function() {

	var chooser = new Chooser();
	
	it('chooses randomly', function() {
		var remainingAttempt = 5;
		var first = chooser.getNumber();
		var different = false;
		while (remainingAttempt > 0) {
			remainingAttempt --;
            different = different || (chooser.getNumber() !== first);
		}
		
		expect(different).toEqual(true);
	});
	
});