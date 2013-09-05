var Requester = require('../../public/challenge.primeFactors/power.of.two.requester');
var array = require('../../public/js/utils/array.utils');

describe('Power of two Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester({
			 query : { server: 'this-url' }
		});
	});
	
	it('has a number chooser', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(0);
	});
	
	it('adds the number to the url', function() {
		requester.numberChooser = { getNumber: function() { return 42; } };
				
		expect(requester.url()).toEqual('this-url?number=42');
	});
		
});