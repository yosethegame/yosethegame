var matcher = require('./lib/contact.response.matcher');

describe('Contact information response matcher,', function() {

	var status;

	describe('When the contact-me link is present', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
							'<a id="contact-me-link" href="any">Contact me</a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual(matcher.expected);
		});
		
	});	
	
	describe('When the contact-me link is not present,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: missing element a#contact-me-link');
		});
		
	});	
	
	describe('When the contact-me link is present without text,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
			                '<a id="contact-me-link"> </a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual("Error: a#contact-me-link should have a text");
		});
		
	});	
	
	describe('When the contact-me link is present without href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
			                '<a id="contact-me-link">Any text works</a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual("Error: a#contact-me-link should have a href");
		});
		
	});	
	
	describe('When the contact-me link is present with an empty href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
			                '<a id="contact-me-link" href=" ">Any text works</a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual("Error: a#contact-me-link should have a href");
		});
		
	});	
	
});