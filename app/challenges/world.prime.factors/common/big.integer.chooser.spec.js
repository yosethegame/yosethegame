var Chooser = require('./lib/big.integer.chooser');

describe('Big integer chooser:', function() {

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
	
	it('chooses numbers > 1e6', function() {
		var bigEnough = true;
		var number = chooser.getNumber();
		var remainingAttempt = 5;
		while (bigEnough && remainingAttempt > 0) {
			number = chooser.getNumber();
			bigEnough = (number > 1e6);
			remainingAttempt --;
		}
		
		expect(bigEnough).toBe(true);
	});
});