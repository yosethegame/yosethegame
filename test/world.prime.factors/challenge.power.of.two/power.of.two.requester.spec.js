var Requester = require('../../../public/world.prime.factors/challenge.power.of.two/power.of.two.requester');
var array = require('../../../public/js/utils/array.utils');

describe('Power of two Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('has a number chooser', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(0);
	});
	
	it('adds the number to the url', function() {
		requester.numberChooser = { getNumber: function() { return 42; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=42');
	});
		
});