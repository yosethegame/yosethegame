var matcher = require('../../public/challenge.ping/ping.response.matcher');

describe('Ping response matcher:', function() {

	var status;
	var remoteResponse;
	
	beforeEach(function() {
		remoteResponse = { headers: [] };
	});
	
	describe('When remote server returns both expected header and content,', function() {
		
		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'application/json';
			status = matcher.validate({}, remoteResponse, JSON.stringify({ alive: true }));
		});

		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual({ "content-type": 'application/json', body: {alive: true }});
		});
		
		it('sets the actual value to the given value', function() {
			expect(status.got).toEqual({ "content-type": 'application/json', body: { alive: true }});
		});
	});
	
	describe('When remote server returns bad header,', function() {

		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'text/plain';
			status = matcher.validate({}, remoteResponse, JSON.stringify({ alive: true }));
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual({ "content-type": 'application/json', body: {alive: true }});
		});
		
		it('sets the actual value to the given value', function() {
			expect(status.got).toEqual({ "content-type": 'text/plain', body: { alive: true }});
		});
	});
	
	describe('When remote server returns no header,', function() {

		beforeEach(function() {
			status = matcher.validate({}, remoteResponse, JSON.stringify({ alive: true }));
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual({ "content-type": 'application/json', body: {alive: true }});
		});
		
		it('sets the actual value to the given value', function() {
			expect(status.got).toEqual({ "content-type": undefined, body: { alive: true }});
		});
	});
	
	describe('When remote server returns bad content,', function() {

		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'application/json';
			status = matcher.validate({}, remoteResponse, 'anything');
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual({ "content-type": 'application/json', body: {alive: true }});
		});
		
		it('sets the actual value to the given value', function() {
			expect(status.got).toEqual({ "content-type": 'application/json', body: 'anything' });
		});
	});	
	
	describe('When no remote server answers', function() {
		
		beforeEach(function() {
			status = matcher.validate({}, undefined, 'anything');
		});
		
		it('sets code to 404', function() {
			expect(status.code).toEqual(404);
		});

		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual({ "content-type": 'application/json', body: {alive: true }});
		});

		it('sets the actual value to undefined', function() {
			expect(status.got).toEqual(undefined);
		});
	});
	
});