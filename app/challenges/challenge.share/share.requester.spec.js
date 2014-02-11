var Requester = require('./lib/share.requester');

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
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
});