var matcher = require('../../../public/world.minesweeper/challenge.injection/injection.response.matcher');

describe('Minesweeper data injection', function() {

	var status;
	var remote;
	
	describe('fails when load() function does not exist', function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" class="any"></label>' +
							'<label id="cell-1x2"></label>' +
							'<label id="cell-2x1"></label>' +
							'<label id="cell-2x2"></label>' +
							
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.useData([
					[ 'bomb' , 'empty'],
					[ 'empty', 'bomb' ]
				]);		
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
				expect(status.expected).toContain('A load() method');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain('missing load() method');
				done();
			});
		});
	});
	
	
});