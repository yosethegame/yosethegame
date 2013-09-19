var Requester = require('../../public/level.1/ping.requester');

describe('Ping challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	describe('target url', function() {
		
		it('simply uses the given url', function() {
			expect(requester.url()).toEqual('this-url');
		});

	});
});