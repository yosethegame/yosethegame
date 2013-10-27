var Requester = require('../../../public/world.minesweeper/challenge.board/board.requester');

describe('Board Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('adds /minesweeper to the url', function() {
		expect(requester.url()).toEqual('this-url/minesweeper');
	});
		
});