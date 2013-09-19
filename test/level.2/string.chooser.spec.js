var Chooser = require('../../public/level.2/string.chooser');

describe('String chooser', function() {

	var chooser = new Chooser();
	
	it('chooses a string', function() {
		expect(typeof(chooser.getString())).toEqual('string');
	});
	
	it('chooses "randomly"', function() {
		var first = chooser.getString();
		var second = chooser.getString();
		var remainingAttempt = 5;
		while (second == first && remainingAttempt > 0) {
			second = chooser.getString();
			remainingAttempt --;
		}
		
		expect(first).not.toEqual(second);
	});
	
});