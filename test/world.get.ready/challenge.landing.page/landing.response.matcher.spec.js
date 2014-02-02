var matcher = require('../../../public/world.get.ready/challenge.landing.page/landing.response.matcher');

describe('Landing page response matcher,', function() {

	var status;
	
	beforeEach(function() {
	    matcher.player = { portfolio: [ { server: 'http://this-url' } ] };
	});
	
	it('knows the expected response', function() {
	    expect(matcher.expected()).toEqual("content-type text/html AND a a#ping-challenge-link with href='http://this-url/ping'");
	});
	
	describe('When remote server responds the expected elements and the expected content-type', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
							'<label id="welcome">title</label>' +
							'<a id="ping-challenge-link" href="http://this-url/ping">The ping challenge</a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
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
		
		it('support extra info in content-type like the charset', function() {
			status = matcher.computeStatus({ headers: {'content-type': 'text/html; charset=utf-8'} }, content);
			expect(status.code).toEqual(200);
		});
		
	});	
	
	describe('When remote server does not respond with content-type text/html', function() {
	
		beforeEach(function() {
			status = matcher.computeStatus({ headers: {'content-type': 'any' } }, 'any content');
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected());
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: Content-Type = any');
		});
		
		it('reports text/plain when content-type is not found', function() {
		    status = matcher.computeStatus({ headers: {} }, 'any content');

			expect(status.got).toEqual('Error: Content-Type = text/plain');
		});
		
	});
	
	describe('When remote server responds with page missing element a#ping-challenge-link,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
			                '<label id="welcome">title</label>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected());
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: missing element a#ping-challenge-link');
		});
		
	});	

	describe('When remote server responds with an element a#ping-challenge-link and incorrect href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
			                '<label id="welcome">title</label>' +
							'<a id="ping-challenge-link" href="any/ping">The ping challenge</a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected());
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: a#ping-challenge-link attribute href="any/ping"');
		});
		
	});

	describe('When remote server responds with an element a#ping-challenge-link and correct href attribute,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
			                '<label id="welcome">title</label>' +
							'<a id="ping-challenge-link" href="/ping">The ping challenge</a>' +
					  '</body></html>';			
			status = matcher.computeStatus({ headers: {'content-type': contentType} }, content);
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
});