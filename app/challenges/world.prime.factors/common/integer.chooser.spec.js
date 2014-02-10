var Chooser = require('./lib/integer.chooser');

describe('Power of two chooser', function() {

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
	
});