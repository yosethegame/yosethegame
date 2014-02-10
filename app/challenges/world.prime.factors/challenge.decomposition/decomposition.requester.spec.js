var Requester = require('./lib/decomposition.requester');
var array = require('../../../utils/lib/array.utils');

describe('Decomposition Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('suppresses eventual training slash', function() {
	   expect(new Requester('this-url/').server).toEqual('this-url'); 
	});
	
	it('has a number chooser choosing a positive integer > 1', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(1);
	});
	
	it('adds the number to the url', function() {
		requester.numberChooser = { getNumber: function() { return 300; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=300');
	});
		
});