var Requester = require('./lib/gates.requester');

describe('Gates challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-server');
	});
	
	it('suppresses training slash from the given server url', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
	describe('target url', function() {
		
		beforeEach(function() {
			requester = new Requester('this-server');            
		});
		
		it('points to the astroport url', function() {
            url = requester.url();
			
			expect(url).toEqual('this-server/astroport');
		});
		
	});
	
});
