var Requester = require('./lib/power.of.two.requester');
var array = require('../../../utils/lib/array.utils');

describe('Power of two Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
	it('has a number chooser', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(0);
	});
	
	it('adds the number to the url', function() {
		requester.numberChooser = { getNumber: function() { return 42; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=42');
	});
		
});