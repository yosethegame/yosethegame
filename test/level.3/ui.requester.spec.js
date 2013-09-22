var Requester = require('../../public/level.3/ui.requester');

describe('UI Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('adds /ui to the url', function() {
		expect(requester.url()).toEqual('this-url/primeFactors/ui');
	});
		
});