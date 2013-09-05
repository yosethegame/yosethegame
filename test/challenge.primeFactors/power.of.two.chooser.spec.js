var Chooser = require('../../public/challenge.primeFactors/power.of.two.chooser');
var array = require('../../public/js/utils/array.utils');

describe('Power of two chooser', function() {

	var chooser = new Chooser();
	
	it('chooses a power-of-two number', function() {
		var number = chooser.getNumber();

		expect(array.firstItemIn([2, 4, 8, 16, 64, 128, 256, 512, 1024, 2048], function(item) {
			return item == number;
		})).toBeDefined();
	});
	
	it('chooses "randomly"', function() {
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