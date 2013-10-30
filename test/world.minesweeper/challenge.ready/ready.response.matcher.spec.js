var matcher = require('../../../public/world.minesweeper/challenge.ready/ready.response.matcher');

describe('Minesweeper ready to play', function() {

	var remote;
	
	describe('fails when play() function does not exist', function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1"></label>' +
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
				expect(status.expected).toContain('A play() method');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain('missing play() method');
				done();
			});
		});
	});
	
	describe('fails when one cell has not onclick event set', function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" onclick="play(1, 2)"></label>' +
							'<label id="cell-2x1"></label>' +
							'<label id="cell-2x2" onclick="play(2, 2)"></label>' +
							
							'<script>function play(){}</script>' +
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
				expect(status.expected).toContain('#cell-2x1 onclick = play(2, 1)');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain('missing play(2, 1) onclick on #cell-2x1');
				done();
			});
		});
	});
		
});