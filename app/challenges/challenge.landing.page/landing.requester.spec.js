var Requester = require('./lib/landing.requester');

describe('Landing page challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	describe('target url', function() {
		
		it('simply uses the given url', function() {
			expect(requester.url()).toEqual('this-url');
		});

	});
	
	it('removes the trailing slash is any', function() {
        expect(new Requester('this-url/').url()).toEqual('this-url');
	});
	
});