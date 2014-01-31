var matcher = require('../../../public/world.get.ready/challenge.hello.yose/hello.yose.response.matcher');

describe('Hello Yose response matcher,', function() {

	var status;
	
	it('knows the expected response', function() {
	    expect(matcher.expected).toEqual("A page containing the text 'Hello Yose'");
	});
	
	describe('When remote server responds the expected content', function() {
	
		beforeEach(function() {
			content = '<html><body>' +
							'Hello Yose' +
					  '</body></html>';			
			status = matcher.computeStatus({ }, content);
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
	
	describe('When no remote server answers,', function() {
		
		beforeEach(function() {
			status = matcher.computeStatus(undefined, 'anything');
		});
		
		it('sets code to 404', function() {
			expect(status.code).toEqual(404);
		});

		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(matcher.expected);
		});

		it('sets the actual value to undefined', function() {
			expect(status.got).toEqual('Error: 404');
		});
	});
	
	describe('When remote server does not respond the expected content', function() {
	
		beforeEach(function() {
			status = matcher.computeStatus({ }, 'anything but the expected content');
		});
		
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});
		
		it('sets actual', function() {
			expect(status.got).toEqual("Error: missing text 'Hello Yose'");
		});
		
	});
	
});