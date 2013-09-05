var Requester = require('../../public/challenge.ping/ping.requester');

describe('Ping challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester({
			 query : { server: 'this-url' }
		});
	});
	
	describe('target url', function() {
		
		it('simply uses the given url', function() {
			expect(requester.url()).toEqual('this-url');
		});

	});
});