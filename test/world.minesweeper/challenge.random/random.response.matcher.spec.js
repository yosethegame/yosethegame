var matcher = require('../../../public/world.minesweeper/challenge.random/random.response.matcher');

describe('Random challenge response matcher', function() {
    
    var remote;
    
    describe('fails when document.grid is always the same,', function() {
        
   	    beforeEach(function() {
			content = '<html><body>' +
							'<script>' +
							'   document.grid = [ ["empty", "empty"], [ "empty", "bomb" ] ]; ' +
							'</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
		});
		
		afterEach(function() {
			remote.close();
		});
		
        it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.expected).toContain("Not always the same document.grid");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("The same document.grid");
				done();
			});
		});
    });
    
    describe('passes when document.grid is not always the same,', function() {
    
        var access;
    
   	    beforeEach(function() {
   	        access = 1;
			firstContent = '<html><body>' +
							'<script>' +
							'   document.grid = [ ["empty", "empty"], [ "empty", "bomb" ] ]; ' +
							'</script>' +
					  '</body></html>';			

          	secondContent = '<html><body>' +
			                '<script>' +
							'   document.grid = [ ["empty", "empty"], [ "bomb", "bomb" ] ]; ' +
			                '</script>' +
  						  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
				    access += 1;
					response.write(access % 2 == 0 ? firstContent : secondContent);
					response.end();
				})
			.listen(6000);				
		});
		
		afterEach(function() {
			remote.close();
		});
		
   	    it('sets code to 200', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.code).toEqual(200);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.expected).toContain("Not always the same document.grid");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("Not always the same document.grid");
				done();
			});
		});
    });
    
});