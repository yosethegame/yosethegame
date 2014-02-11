var Requester = require('./lib/board.requester');

describe('Board Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
	it('adds /minesweeper to the url', function() {
		expect(requester.url()).toEqual('this-url/minesweeper');
	});
		
});