var Browser = require('zombie');

module.exports = {
    
	data: [
		['empty', 'bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty', 'empty'],
		['empty', 'bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty'],
		['bomb', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty', 'bomb'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ],

	candidates: [
        { row: 1, column: 4 }, 
        { row: 1, column: 5 }, 
        { row: 1, column: 6 }, 
        { row: 1, column: 7 }, 
        { row: 1, column: 8 }, 
        { row: 8, column: 3 }, 
        { row: 8, column: 4 }, 
        { row: 8, column: 5 }, 
        { row: 8, column: 6 }, 
        { row: 8, column: 7 }, 
        { row: 8, column: 8 }, 
	],
	
	candidateIndex: function() {
        return Math.floor(Math.random() * this.candidates.length);
	},
	
    cellId: function(index) {
        var position = this.candidates[index];
        return 'cell-' + position.row + 'x' + position.column;
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var expected = "";
		var candidateIndex = this.candidateIndex();
		var cellWithNoBombAroundId = this.cellId(candidateIndex);
		var browser = new Browser();		
		browser.visit(url).
			then(function() {
				browser.document.grid = self.data;
				var result = browser.evaluate('load()');
			}).
			then(function() {
				browser.click('[id=' + cellWithNoBombAroundId + ']');
				var text = browser.text('[id=' + cellWithNoBombAroundId + ']');
				
				if (text !== '') {
                    expected = 'empty text in #' + cellWithNoBombAroundId;
                    throw "Error: #" + cellWithNoBombAroundId + " text = '" + text + "'";
				}
			}).
			then(function() {
				callback({
					code: 200,
					expected: expected,
					got: expected
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: expected,
					got: error.toString()
				});
			});
	}
	
};