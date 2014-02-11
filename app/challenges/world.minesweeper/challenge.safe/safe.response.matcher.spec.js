var matcher = require('./lib/safe.response.matcher');
var array = require('../../../utils/lib/array.utils');

describe('Safe cells in Minesweeper game', function() {
   
	it('injects a 8x8 grid', function() {
		expect(matcher.data.length).toEqual(8);
		array.forEach(matcher.data, function(row) {
            expect(row.length).toEqual(8);
		});
	});
	
	it('the candidates target empty cells', function() {
        array.forEach(matcher.candidates, function(candidate) {
            expect(matcher.data[candidate.row-1][candidate.column-1]).toEqual('empty'); 
        });
	});
	
	it('plays randomly on an empty cell', function() {
		var first = matcher.cellIndex();
		var same = true;
		array.forEach([1, 2, 3, 4, 5], function(index) {
            var second = matcher.cellIndex();
            if (second !== first) { same = false; }
		});
		
		expect(same).toBe(false);
	});
	
	it('builds the cell id of the cell to play', function() {
        expect(matcher.cellId(1)).toEqual('cell-3x1');
	});
		
    describe("fails when playing on a empty cell does not set the class of the cell to 'safe':", function() {

        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="any" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
                            '</body></html>';

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.data = [ [ 'bomb' , 'empty', 'bomb'] ];
			matcher.candidates = [ { row:1, column:2, bombAround:2 } ];
            matcher.cellIndex = function() { return 0; };
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
				expect(status.expected).toContain("#cell-1x2 with class containing 'safe'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x2 class = 'any'");
				done();
			});
		});
		
    });
    
    describe("fails when the game starts with 'safe' class in the cell and the correct bomb count,", function() {
        
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" class="safe" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="safe" onclick="play(1, 2)">2</label>' +
							'<label id="cell-1x3" class="safe" onclick="play(1, 3)"></label>' +
							
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
			matcher.candidates = [ { row:1, column:2, bombAround:2 } ];
            matcher.cellIndex = function() { return 0; };
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
    });
    
    describe("fails when playing on a empty cell does not display the number of bomb around:", function() {

        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
							'<script>function play(line, column) { ' +
                            '            var id = "cell-" + line + "x" + column;'+
							'            document.getElementById(id).className = "safe"; ' +
							'            document.getElementById(id).innerHTML = "1"; ' +
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
			matcher.candidates = [ { row:1, column:2, bombAround:2 } ];
            matcher.cellIndex = function() { return 0; };
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
				expect(status.expected).toContain("text containing '2'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x2 text = '1'");
				done();
			});
		});
		 
    });
    
    describe("passes when playing on a empty cell displays the expected number of bomb around:", function() {

        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
							'<script>function play(line, column) { ' +
                            '            var id = "cell-" + line + "x" + column;' +
							'            document.getElementById(id).className = "safe"; ' +
							'            document.getElementById(id).innerHTML = "2"; ' +
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
			matcher.candidates = [ { row:1, column:2, bombAround:2 } ];
            matcher.cellIndex = function() { return 0; };
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
				expect(status.expected).toEqual("#cell-1x2 with class containing 'safe' and text containing '2'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toEqual("#cell-1x2 with class containing 'safe' and text containing '2'");
				done();
			});
		});
		 
    });
    
});