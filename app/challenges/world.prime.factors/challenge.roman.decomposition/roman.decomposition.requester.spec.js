var Requester = require('./lib/roman.decomposition.requester');
var array = require('../../../utils/lib/array.utils');

describe('Decomposition Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
	it('adds the number to the url', function() {
		requester.chooseNumber = function() { return 323; };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=CCCXXIII');
	});
	
	it('chooses randomly a number', function() {
        var different = false;
        var first = requester.chooseNumber();
        [1, 2, 3, 4, 5].forEach(function() {
            var second = requester.chooseNumber();
            if (second != first) { different = true; }
        });

        expect(different).toEqual(true);
	});
		
});