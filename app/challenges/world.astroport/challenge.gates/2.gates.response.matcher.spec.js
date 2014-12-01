var matcher = require('./lib/gates.response.matcher');

describe('Name response matcher,', function() {
    
    it('fails', function() {
        require('../common/fails.when.the.remote.server').doesNotAnswer(matcher);
        require('../common/fails.when.the.remote.server').answersWith404(matcher);

        require('../common/fails.when.the.header').isUndefined(matcher);
        require('../common/fails.when.the.header').isEmpty(matcher);
        require('../common/fails.when.the.header').isNotTextHtml(matcher);
    });
    
	it('knows the expected response', function() {
        expect(matcher.expected).toEqual('3 gates containing each a place for a ship');
	});
    
    var status;
    
    describe('when the server responds with missing #gate-1', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #gate-1');
		});        
    });
    
    describe('when the server responds with missing #gate-2', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #gate-2');
		});        
    });
    
    describe('when the server responds with missing #gate-3', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                            '</div>' + 
                            '<div id="gate-2">' +
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #gate-3');
		});        
    });

    describe('when the server responds with missing element #ship-1', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                            '</div>' + 
                            '<div id="gate-2">' +
                            '</div>' + 
                            '<div id="gate-3">' +
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #ship-1 in element #gate-1');
		});        
    });

    describe('when the server responds with #ship-1 not descendant of #gate-1', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                            '</div>' + 
                            '<div id="ship-1">' +
                            '</div>' + 
                            '<div id="gate-2">' +
                            '</div>' + 
                            '<div id="gate-3">' +
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #ship-1 in element #gate-1');
		});        
    });

    describe('when the server responds with #ship-2 not descendant of #gate-2', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                                '<div id="ship-1">' +
                                '</div>' + 
                            '</div>' + 
                            '<div id="gate-2">' +
                            '</div>' + 
                            '<div id="gate-3">' +
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #ship-2 in element #gate-2');
		});        
    });

    describe('when the server responds with #ship-3 not descendant of #gate-3', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                                '<div id="ship-1">' +
                                '</div>' + 
                            '</div>' + 
                            '<div id="gate-2">' +
                                '<div id="ship-2">' +
                                '</div>' + 
                            '</div>' + 
                            '<div id="gate-3">' +
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 501', function() {
			expect(status.code).toEqual(501);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain('Error: missing element #ship-3 in element #gate-3');
		});        
    });
    
    describe('when the server responds with the expected elements', function() {
        
        beforeEach(function(done) {
            var content = '<html><body>'+
                            '<div id="gate-1">' +
                                '<div id="ship-1">' +
                                '</div>' + 
                            '</div>' + 
                            '<div id="gate-2">' +
                                '<div id="ship-2">' +
                                '</div>' + 
                            '</div>' + 
                            '<div id="gate-3">' +
                                '<div id="ship-3">' +
                                '</div>' + 
                            '</div>' + 
                          '</body></html>';
			matcher.validate('', { statusCode: 200, headers: { 'content-type': 'text/html'} }, content, function(receivedStatus) {
				status = receivedStatus;
				done();
			});
        });
        
		it('sets code to 200', function() {
			expect(status.code).toEqual(200);
		});
	
		it('sets expected', function() {
			expect(status.expected).toContain(matcher.expected);
		});
	
		it('sets actual', function() {
			expect(status.got).toContain(matcher.expected);
		});        
    });
});