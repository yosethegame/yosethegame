var Chooser = require('./lib/negative.integer.chooser');

describe('Negative integer chooser:', function() {

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
	
	it('chooses integers < 2', function() {
		var negativeEnough = true;
		var number = chooser.getNumber();
		var remainingAttempt = 5;
		while (negativeEnough && remainingAttempt > 0) {
			number = chooser.getNumber();
			negativeEnough = (number < 2);
			remainingAttempt --;
		}
		
		expect(negativeEnough).toBe(true);
	});
});