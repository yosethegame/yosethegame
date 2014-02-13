var matcher = require('./lib/portfolio.response.matcher');

describe('Minesweper portfolio challenge response matcher,', function() {

	var status;
	
	beforeEach(function() {
        matcher.player = { portfolio: [ { server: 'http://this-url' } ] };
	});
	
	it('knows the expected response', function() {
        expect(matcher.expected()).toEqual("An element a#minesweeper-link with href='http://this-url/minesweeper' (case sensitive)");
	});
	
	describe('When remote server responds the expected element', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content =   '<html><body>' +
                            '<a id="minesweeper-link" href="http://this-url/minesweeper">A minesweeper game</a>' +
                        '</body></html>';
			status = matcher.computeStatus({}, content);
		});
		
		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected());
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual(matcher.expected());
		});
		
		describe('a case diff', function() {

            beforeEach(function() {
                contentType = 'text/html';
                content =   '<html><body>' +
                                '<a id="minesweeper-link" href="http://this-url/Minesweeper">A minesweeper game</a>' +
                            '</body></html>';			
                status = matcher.computeStatus({}, content);
            });

            it('is not accepted', function() {
                expect(status.code).toEqual(501);
            }); 
		});
		
	});	

});