var Chooser = require('../../public/levels.common/big.integer.chooser');

describe('Big integer chooser:', function() {

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