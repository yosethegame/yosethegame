var matcher = require('./lib/suspect.response.matcher');
var array = require('../../../utils/lib/array.utils');

describe('Suspect mode challenge in Minesweeper game', function() {
   
	it('injects a 8x8 grid', function() {
		expect(matcher.data.length).toEqual(8);
		array.forEach(matcher.data, function(row) {
            expect(row.length).toEqual(8);
		});
	});
	
	it('targets cells with a bomb', function() {
        array.forEach(matcher.candidates, function(candidate) {
            expect(matcher.data[candidate.row-1][candidate.column-1]).toEqual('bomb'); 
        });
	});
	
	it('plays randomly on a cell with a bomb', function() {
		var first = matcher.cellIndex();
		var same = true;
		array.forEach([1, 2, 3, 4, 5], function(index) {
            var second = matcher.cellIndex();
            if (second !== first) { same = false; }
		});
		
		expect(same).toBe(false);
	});
	
	it('builds the cell id of the cell to play', function() {
        expect(matcher.cellId(0)).toEqual('cell-2x1');
	});
	
	it('has a pool of 7 candidates', function() {
	    expect(matcher.candidates.length).toEqual(7);	    
	});
	
	describe('Fails when the page is missing the suspect-mode checkbox activator', function() {
		beforeEach(function() {
			content = '<html><body>' +
							'<label id="suspect-mode">anything</label>' +
							'<script>function load() { }</script>' +
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
				expect(status.expected).toContain('a checkbox with id="suspect-mode"');
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain('missing element input#suspect-mode[type=checkbox]');
				done();
			});
		});
	});
	
	describe("fails when playing on a cell does not set the class of the cell to 'suspect':", function() {

        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +
                            '<input id="suspect-mode" type="checkbox" />' +
							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
							'<script>function play(line, column) { ' +
                            '            var id = "cell-" + line + "x" + column;'+
							'            document.getElementById(id).className = "anything"; ' +
							'        }' +
							'</script>' +
                            '</body></html>';

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.data = [ [ 'bomb' , 'bomb', 'bomb'] ];
			matcher.candidates = [ { row:1, column:2 } ];
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
				expect(status.expected).toContain("#cell-1x2 with class containing 'suspect'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x2 class = 'anything'");
				done();
			});
		});
		
    });
	
});