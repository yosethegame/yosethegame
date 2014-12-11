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
	
		beforeEach(function(done) {
			contentType = 'text/html';
			content =   '<html><body>' +
                            '<a id="minesweeper-link" href="http://this-url/minesweeper">A minesweeper game</a>' +
                        '</body></html>';
			matcher.validate({}, {}, content, function(receivedStatus) {
			    status = receivedStatus;
                done();
			});
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
		
	});	

	describe('When remote server responds with page missing link element,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content =   '<html><body>' +
                        '</body></html>';			
			status = matcher.computeStatus({}, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected());
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: missing element a#minesweeper-link');
		});
		
	});
	
	describe('When remote server responds with the correct link id and incorrect href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content =   '<html><body>' +
                            '<a id="minesweeper-link" href="any/url">A Minesweeper game</a>' +
                        '</body></html>';			
			status = matcher.computeStatus({}, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected());
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: a#minesweeper-link href="any/url"');
		});
		
	});
	
});