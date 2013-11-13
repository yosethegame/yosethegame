var matcher = require('../../../public/world.minesweeper/challenge.open/open.response.matcher');
var array = require('../../../public/js/utils/array.utils');

describe('Open field in Minesweeper game:', function() {
    
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
	
});
