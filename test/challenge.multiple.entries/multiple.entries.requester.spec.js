var Requester = require('../../public/challenge.multiple.entries/multiple.entries.requester');
var array = require('../../public/js/utils/array.utils');

describe('Multiple entries Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('has a number chooser choosing a positive integer > 1', function() {
		expect(requester.numberChooser.getNumber()).toBeGreaterThan(1);
	});
	
	it('has a string chooser', function() {
		expect(typeof requester.stringChooser.getString()).toEqual('string');
	});
	
	it('adds three values to the url', function() {
		var first = true;
		requester.numberChooser = { getNumber: function() { 
										if (first) {
											return 300;
											first = false;
										}
										return 42; 
									} 
		};
		requester.stringChooser = { getString: function() { return 'yolo'; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=300&number=42&number=yolo');
	});
		
});