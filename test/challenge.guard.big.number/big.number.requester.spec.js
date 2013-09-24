var Requester = require('../../public/challenge.guard.big.number/big.number.requester');
var array = require('../../public/js/utils/array.utils');

describe('Big number guard Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('has a number chooser choosing a positive integer > 1e6', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(1e6);
	});
	
	it('adds the number to the url', function() {
		requester.numberChooser = { getNumber: function() { return 300; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=300');
	});
		
});