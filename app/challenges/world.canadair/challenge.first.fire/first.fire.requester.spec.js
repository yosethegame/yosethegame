var Requester = require('./lib/first.fire.requester');

describe('First fire challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-server');
	});
	
	describe('target url', function() {
		
		it('is the root of the server of the player', function() {
			expect(requester.url()).toEqual('to be defined');
		});

	});
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
});