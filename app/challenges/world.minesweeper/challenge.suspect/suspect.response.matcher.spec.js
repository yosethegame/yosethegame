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
	
});