var Requester = require('../../public/challenge.form/form.requester');

describe('Form Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('adds /ui to the url', function() {
		expect(requester.url()).toEqual('this-url/primeFactors/ui');
	});
		
});