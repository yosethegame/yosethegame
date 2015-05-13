var matcher = require('./lib/form.response.matcher');

describe('Form response matcher,', function() {

	it('knows the expected form', function() {
		expect(matcher.expected).toEqual('A form with elements #title #invitation input#number button#go');
	});

	var status;

	describe('When remote server responds the expected form and the expected content-type', function() {

		beforeEach(function(done) {
			contentType = 'text/html';
			content = '<html><body>' +
							'<label id="title">title</label>' +
							'<label id="invitation">invitation</label>' +
							'<input id="number">' +
							'<button id="go">go</button>' +
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

		it('support extra info in content-type like the charset', function() {
			status = matcher.computeStatus({ headers: {'content-type': contentType + '; charset=utf-8'} }, content);
			expect(status.code).toEqual(200);
		});

	});

	describe('When remote server responds with missing content-type', function() {

		beforeEach(function() {
			status = matcher.computeStatus({ headers: { 'any': 'value' } }, 'any' );
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toEqual({ 'content-type': 'text/html' } );
		});

		it('sets actual', function() {
			expect(status.got).toEqual({ 'content-type': 'text/plain' } );
		});

	});

	describe('When remote server responds with incorrect content-type', function() {

		beforeEach(function() {
			status = matcher.computeStatus({ headers: {'content-type': 'any' } }, 'any' );
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toEqual({ 'content-type': 'text/html' } );
		});

		it('sets actual', function() {
			expect(status.got).toEqual({ 'content-type': 'any' } );
		});

	});

	describe('When the form is incomplete,', function() {

		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">title</label>' +
							'<label id="invitation">invitation</label>' +
							'<button id="go">go</button>' +
                        '</body></html>';
			status = matcher.computeStatus({ headers: {'content-type': 'text/html' } }, content);
		});

		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});

		it('sets expected', function() {
			expect(status.expected).toEqual(matcher.expected);
		});

		it('sets actual', function() {
			expect(status.got).toEqual('A form missing input#number' );
		});
	});

	it('resists to undefined remoteResponse', function() {
		status = matcher.computeStatus(undefined, content);
	});

});
