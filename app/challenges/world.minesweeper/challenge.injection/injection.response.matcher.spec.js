var matcher = require('./lib/injection.response.matcher');
var array = require('../../../utils/lib/array.utils');

describe('Minesweeper data injection', function() {

	var status;
	var remote;
	
	it('injects a 8x8 grid', function() {
		expect(matcher.data.length).toEqual(8);
		array.forEach(matcher.data, function(row) {
            expect(row.length).toEqual(8);
		});
	});
	
	it('knows where the bombs are', function() {
        array.forEach(matcher.candidates, function(candidate) {
            expect(matcher.data[candidate.row-1][candidate.column-1]).toEqual('bomb');
        });
	});
	
	it('plays randomly on a bomb', function() {
		var first = matcher.bombIndex();
		var same = true;
		array.forEach([1, 2, 3, 4, 5], function(index) {
            var second = matcher.bombIndex();
            if (second !== first) { same = false; }
		});
		
		expect(same).toBe(false);
	});
	
	it('builds the cell id of the bomb to play', function() {
        expect(matcher.cellId(0)).toEqual('cell-2x1');
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
			
			matcher.data = [ [ 'bomb' , 'empty', 'bomb'] ];
			matcher.candidates = [ {row:1, column:1}, {row:1, column:3} ];
            matcher.bombIndex = function() { return 1; };
		});
		
		afterEach(function() {
			remote.close();
		});
		
		it('plays the second bomb', function() {
            expect(matcher.bombIndex()).toEqual(1);
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
	
	describe("fails when the game starts with 'lost' class in cells,", function() {
		
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" class="lost" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="lost" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" class="lost" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
							'<script>function play(line, column) { }</script>' +
                        '</body></html>';

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.data = [ [ 'bomb' , 'empty', 'bomb'] ];
			matcher.candidates = [ {row:1, column:1}, {row:1, column:3} ];
            matcher.bombIndex = function() { return 1; };
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
				expect(status.expected).toContain("#cell-1x3 class containing 'lost' after click");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x3 class = 'lost' before click");
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
                            '            var id = "cell-" + line + "x" + column;' +
                            '            var state = document.grid[line-1][column-1] == "bomb" ? "lost" : "";' +
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
			
			matcher.data = [ [ 'bomb' , 'empty', 'bomb'] ];
			matcher.candidates = [ {row:1, column:1}, {row:1, column:3} ];
            matcher.bombIndex = function() { return 1; };
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