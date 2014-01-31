var Requester = require('../../../public/world.get.ready/challenge.hello.yose/hello.yose.requester');

describe('Hello Yose challenge requester', function() {
	
	var requester;
	
	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	describe('target url', function() {
		
		it('simply uses the given url', function() {
			expect(requester.url()).toEqual('this-url');
		});

	});
	
	it('suppresses eventual training slash', function() {
	   expect(new Requester('this-url/').server).toEqual('this-url'); 
	});
	
});