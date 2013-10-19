var Requester = require('../../public/challenge.share/share.requester');

describe('Share challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-server');
	});
	
	describe('target url', function() {
		
		it('is the root of the server of the player', function() {
			expect(requester.url()).toEqual('this-server');
		});

	});
});