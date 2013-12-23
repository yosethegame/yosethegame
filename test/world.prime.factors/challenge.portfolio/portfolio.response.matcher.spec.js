var matcher = require('../../../public/world.prime.factors/challenge.portfolio/portfolio.response.matcher');

describe('Landing page response matcher,', function() {

	var status;
	
	beforeEach(function() {
	    matcher.player = { portfolio: [ { server: 'http://this-url' } ] };
	});
	
	it('knows the expected response', function() {
	    expect(matcher.expected()).toEqual("An element a#prime-factors-decomposition-link with href='http://this-url/primeFactors/ui' (case sensitive)");
	});
	
	describe('When remote server responds the expected element', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
							'<a id="prime-factors-decomposition-link" href="http://this-url/primeFactors/ui">The prime factors challenges</a>' +
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
    			content = '<html><body>' +
    							'<a id="prime-factors-decomposition-link" href="http://this-url/PrimeFactors/UI">The prime factors challenges</a>' +
    					  '</body></html>';			
    			status = matcher.computeStatus({}, content);
    		});

 		   it('is not accepted', function() {
    			expect(status.code).toEqual(501);
		   }); 
		});
		
	});	
	
	describe('When remote server responds with page missing link element,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
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
			expect(status.got).toEqual('Error: missing element a#prime-factors-decomposition-link');
		});
		
	});
	
	describe('When remote server responds with the correct link id and incorrect href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
							'<a id="prime-factors-decomposition-link" href="any/primeFactors/ui">The prime factors</a>' +
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
			expect(status.got).toEqual('Error: a#prime-factors-decomposition-link attribute href="any/primeFactors/ui"');
		});
		
	});

});