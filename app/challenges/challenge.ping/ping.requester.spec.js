var Requester = require('./lib/ping.requester');

describe('Ping challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	describe('target url', function() {
		
		it('simply uses the given url and add /ping to it', function() {
			expect(requester.url()).toEqual('this-url/ping');
		});

	});
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
});