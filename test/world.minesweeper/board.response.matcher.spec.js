var matcher = require('../../public/world.minesweeper/challenge.board/board.response.matcher');

describe('Minesweeper response matcher,', function() {

	describe('When the page is missing #title,', function() {
	
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="not-title">anything</label>' +

					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': 'text/html' } }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});		
		
		it('sets expected', function() {
			expect(status.expected).toContain('A page with an element #title');
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('A page missing #title' );
		});
	});
	
});