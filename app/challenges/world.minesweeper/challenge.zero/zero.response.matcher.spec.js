var matcher = require('./lib/zero.response.matcher');
var array = require('../../../utils/lib/array.utils');

describe('Zero challenge in Minesweeper game:', function() {
    
    it('uses a 8x8 grid', function() {
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
	
	it('plays randomly on a candidate', function() {
		var first = matcher.candidateIndex();
		var same = true;
		array.forEach([1, 2, 3, 4, 5], function(index) {
		    var second = matcher.candidateIndex();
    		if (second !== first) { same = false; }
		});
		
		expect(same).toBe(false);
	});
	
	describe('fails when clicking on a cell with zero bomb around set text of cell to anything but empty', function() {
	   
	    beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1">0</label>' +
							'<label id="cell-1x2"></label>' +
							'<label id="cell-1x3"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.data = [ [ 'empty' , 'empty', 'empty'] ];
			matcher.candidates = [{ row:1, column:1 } ];
			matcher.candidateIndex = function() { return 0; }
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
				expect(status.expected).toContain("empty text in #cell-1x1");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x1 text = '0'");
				done();
			});
		});
	    
	});
	
	describe('passes when clicking on a cell with zero bomb around set text of cell to empty', function() {
	   
	    beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1"></label>' +
							'<label id="cell-1x2"></label>' +
							'<label id="cell-1x3"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.data = [ [ 'empty' , 'empty', 'empty'] ];
			matcher.candidates = [{ row:1, column:1 } ];
			matcher.candidateIndex = function() { return 0; }
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
				expect(status.expected).toContain("empty text in #cell-1x1");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("empty text in #cell-1x1");
				done();
			});
		});
	    
	});
	
});
