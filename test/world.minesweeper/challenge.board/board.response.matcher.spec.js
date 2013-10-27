var matcher = require('../../../public/world.minesweeper/challenge.board/board.response.matcher');

describe('Minesweeper response matcher', function() {

	var status;
	var remote;
	
	describe('Fails when the page is missing #title:', function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="not-title">anything</label>' +
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
				expect(status.expected).toContain('A #title');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain('missing element #title');
				done();
			});
		});
	});
	
	describe('Fails when #title does not contain Minesweeper:', function() {
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">anything</label>' +
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
				expect(status.expected).toContain("A #title containing 'Minesweeper'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#title text = 'anything'");
				done();
			});
		});
	});
	
	describe('Fails when the page is missing cell-1x3:', function() {
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1"></label>' +
							'<label id="cell-1x2"></label>' +
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
				expect(status.expected).toContain('a 8x8 cells grid');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain('missing element #cell-1x3');
				done();
			});
		});
	});
	
	describe('Passes when all required cells are present', function() {
		beforeEach(function() {
			var grid = '';
			for(var line=1; line<=8; line++) {
				for(var column=1; column<=8; column++) {
					grid += '<label id="cell-' + line + 'x' + column + '"></label>';
				}
			}
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +
							grid
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

		it('sets code to 200', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.code).toEqual(200);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.expected).toContain('a 8x8 cells grid');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#title containing 'Minesweeper' and 8x8 cells grid");
				done();
			});
		});
	});
});