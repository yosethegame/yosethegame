var matcher = require('../../../public/world.get.ready/challenge.landing.page/landing.response.matcher');

describe('Landing page response matcher,', function() {

	var status;

	describe('When remote server responds the expected elements and the expected content-type', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
							'<label id="welcome">title</label>' +
							'<a id="ping-challenge-link" href="ping">The ping challenge</a>' +
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
		
		it('support extra info in content-type like the charset', function() {
			status = matcher.computeStatus({ headers: {'content-type': contentType + '; charset=utf-8'} }, content);
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
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual('Error: Content-Type = any');
		});
		
		it('reports text/plain when content-type is not found', function() {
		    status = matcher.computeStatus({ headers: {} }, 'any content');

			expect(status.got).toEqual('Error: Content-Type = text/plain');
		});
		
	});
	
	describe('When remote server responds with page containing #welcome,', function() {
	
		beforeEach(function() {
			contentType = 'text/html';
			content = '<html><body>' +
							'<a id="ping-challenge-link" href="ping">The ping challenge</a>' +
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
			expect(status.got).toEqual('Error: missing element #welcome');
		});
		
	});	
	
	
});