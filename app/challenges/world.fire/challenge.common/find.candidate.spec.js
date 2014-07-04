var findCandidate = require('./lib/find.candidate');

describe('Find candidate', function() {

	it('can find the matching map in a collection of one element', function() {
		var candidate = { map: [ 'AB', 'CD'] };
		var found = findCandidate('/any?width=2&map=ABCD', [ candidate ] );
		
		expect(found).toEqual(candidate);
	});

	it('can find the matching map in a collection of two elements', function() {
		var first = { map: [ 'AB', 'CD'] };
		var second = { map: [ 'RR', 'ZZ'] };
		var found = findCandidate('/any?width=2&map=RRZZ', [ first, second ] );
		
		expect(found).toEqual(second);
	});
});