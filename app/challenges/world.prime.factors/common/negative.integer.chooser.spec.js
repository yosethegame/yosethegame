var Chooser = require('./lib/negative.integer.chooser');

describe('Negative integer chooser:', function() {

	var chooser = new Chooser();
	
	it('chooses randomly', function() {
		var first = chooser.getNumber();
		var second = chooser.getNumber();
		var remainingAttempt = 5;
		while (second == first && remainingAttempt > 0) {
			second = chooser.getNumber();
			remainingAttempt --;
		}
		
		expect(first).not.toEqual(second);
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