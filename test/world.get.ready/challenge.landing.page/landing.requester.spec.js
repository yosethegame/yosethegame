var Requester = require('../../../public/world.get.ready/challenge.landing.page/landing.requester');

describe('Landing page challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	describe('target url', function() {
		
		it('simply uses the given url and add / to it', function() {
			expect(requester.url()).toEqual('this-url/');
		});

	});
	
	it('keep given trailing slash if any', function() {
	   expect(new Requester('this-url/').url()).toEqual('this-url/'); 
	});
	
});