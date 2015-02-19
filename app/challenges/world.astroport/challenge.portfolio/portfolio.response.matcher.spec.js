var matcher = require('./lib/portfolio.response.matcher');

describe('Astroport portfolio response matcher,', function() {

    var status;

	describe('When the astroport link is present and correct', function() {
	
		beforeEach(function(done) {
			contentType = 'text/html';
			content = '<html><body>' +
							'<a id="astroport-link" href="/astroport">Astroport</a>' +
                        '</body></html>';
			matcher.validate({}, { headers: {'content-type': contentType} }, content, function(receivedStatus) {
			    status = receivedStatus;
                done();
			});
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
	
	describe('When the astroport link is not present,', function() {
	
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
			expect(status.got).toEqual('Error: missing element a#astroport-link');
		});
		
	});	
	
	describe('When the astroport link is present without text,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
                            '<a id="astroport-link"> </a>' +
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
			expect(status.got).toEqual("Error: a#astroport-link should have a text");
		});
		
	});	
	
	describe('When the astroport link is present without href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
                            '<a id="astroport-link">Any text works</a>' +
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
			expect(status.got).toEqual("Error: a#astroport-link should have a href set to /astroport");
		});
		
	});	
	
	describe('When the astroport link is present with incorrect href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
                            '<a id="astroport-link" href="/any">Any text works</a>' +
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
			expect(status.got).toEqual("Error: a#astroport-link should have a href set to /astroport");
		});
		
	});	
	
});