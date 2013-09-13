var matcher = require('../../public/challenge.primeFactors/power.of.two.response.matcher');
var $ = require('jquery');

describe('Power of two response matcher,', function() {

	var status;
	var remoteResponse;
	
	beforeEach(function() {
		remoteResponse = { headers: [] };
	});

	it('knows the expected answer from the sent request', function() {
		expect(matcher.expectedContent('this-url?number=8')).toEqual({
			number: 8,
			decomposition: [2, 2, 2]
		});
	});
	
	var correctContent = { number: 8, decomposition: [2, 2, 2] };
	var correctAnswer = { 'content-type': 'application/json', body: correctContent };

	it('can compare object after json/de-json only via stringify', function() {
		expect(JSON.stringify($.parseJSON(JSON.stringify(correctAnswer)))).toEqual(JSON.stringify(correctAnswer));
	});
	
	describe('When remote server returns both expected header and content,', function() {
		
		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'application/json';
			status = matcher.computeStatus('this-url?number=8',  remoteResponse,  JSON.stringify(correctContent), matcher);
		});

		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(correctAnswer);
		});
		
		it('sets the actual value to the given value', function() {
			expect(JSON.stringify(status.got)).toEqual(JSON.stringify(correctAnswer));
		});
	});
	
	describe('When remote server returns bad header,', function() {

		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'text/plain';
			status = matcher.computeStatus('this-url?number=8', remoteResponse, JSON.stringify(correctContent), matcher);
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(correctAnswer);
		});
		
		it('sets the actual value to the given value', function() {
			expect(JSON.stringify(status.got)).toEqual(JSON.stringify({ 'content-type': 'text/plain', body: correctContent }));
		});
	});
	
	describe('When remote server returns no header,', function() {

		beforeEach(function() {
			status = matcher.computeStatus('this-url?number=8', remoteResponse, JSON.stringify(correctContent), matcher);
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(correctAnswer);
		});
		
		it('sets the actual value to the given value', function() {
			expect(JSON.stringify(status.got)).toEqual(JSON.stringify({ "content-type": undefined, body: correctContent }));
		});
	});
	
	describe('When remote server returns not a json content,', function() {

		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'application/json';
			status = matcher.computeStatus('this-url?number=8', remoteResponse, 'anything', matcher);
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(correctAnswer);
		});
		
		it('sets the actual value to the given value', function() {
			expect(status.got).toEqual({ "content-type": 'application/json', body: 'anything' });
		});
	});	
	
	describe('When remote server returns a bad content,', function() {

		beforeEach(function() {
			remoteResponse.headers['content-type'] = 'application/json';
			status = matcher.computeStatus('this-url?number=8', remoteResponse, JSON.stringify({ number: 8, decomposition: [2, 2] } ), matcher);
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
		
		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(correctAnswer);
		});
		
		it('sets the actual value to the given value', function() {
			expect(JSON.stringify(status.got)).toEqual(JSON.stringify({ "content-type": 'application/json', body: { number: 8, decomposition: [2, 2] } }));
		});
	});
	
	describe('When no remote server answers,', function() {
		
		beforeEach(function() {
			status = matcher.computeStatus('this-url?number=8', undefined, 'anything', matcher);
		});
		
		it('sets code to 404', function() {
			expect(status.code).toEqual(404);
		});

		it('sets expected value to correct value and header', function() {
			expect(status.expected).toEqual(correctAnswer);
		});

		it('sets the actual value to undefined', function() {
			expect(status.got).toEqual(undefined);
		});
	});
	
	
});