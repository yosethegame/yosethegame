var matcher = require('../../../public/world.minesweeper/challenge.injection/injection.response.matcher');

describe('Minesweeper data injection', function() {

	var status;
	var remote;
	
	it('injects a grid with a bomb', function() {
		expect(matcher.data).toEqual([
				['bomb' , 'empty', 'bomb' ],
				['empty', 'empty', 'empty'],
			]);
	});
	
	it('plays on cell 1,3', function() {
		expect(matcher.line).toEqual(1);
		expect(matcher.column).toEqual(3);
	});
	
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
	
	describe("fails when playing on a bomb does not change the class of the cell to 'lost'", function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" class="empty1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="empty2" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" class="empty3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
							'<script>function play(line, column) { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.useData([ [ 'bomb' , 'empty', 'bomb'] ]);		
			matcher.playOnCell(1, 3);		
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
				expect(status.expected).toContain("#cell-1x3 class containing 'lost'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x3 class = 'empty3'");
				done();
			});
		});
	});
	
	describe("Passes when playing on a bomb sets class of the cell to 'lost'", function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" class="empty1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="empty2" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" class="empty3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
							'<script>function play(line, column) { ' +
							' 			 var id = "cell-" + line + "x" + column;' +
							' 			 var state = document.grid[line-1][column-1] == "bomb" ? "lost" : "";' +
							'            document.getElementById(id).className = state; ' +
							'        }' +
							'</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.useData([ [ 'bomb' , 'empty', 'bomb'] ]);
			matcher.playOnCell(1, 3);		
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
				expect(status.expected).toContain("A load() method and #cell-1x3 class containing 'lost'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("A load() method and #cell-1x3 class containing 'lost'");
				done();
			});
		});
	});
	
});