var Browser = require('zombie');

module.exports = {

	data: [
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb',  'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb',  'empty', 'empty', 'bomb',  'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bomb',  'empty', 'empty', 'empty'],
		['empty', 'empty', 'bomb',  'empty', 'bomb',  'bomb',  'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'bomb',  'empty'],
	],
	
	candidates: [
        { row: 2, column: 2, bombAround: 1}, 
        { row: 3, column: 1, bombAround: 2}, 
        { row: 6, column: 6, bombAround: 3}, 
        { row: 8, column: 3, bombAround: 1}, 
        { row: 8, column: 4, bombAround: 2}, 
        { row: 8, column: 5, bombAround: 2}, 
        { row: 8, column: 6, bombAround: 3}, 
	],
	
	cellIndex: function() {
        return Math.floor(Math.random()*7);
	},
	
	cellId: function(index) {
        var position = this.candidates[index];
        return 'cell-' + position.row + 'x' + position.column;
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var cellIndex = this.cellIndex();
		var emptyCellId = this.cellId(cellIndex);
		var expectedCount = this.candidates[cellIndex].bombAround;
		var expected = "#" + emptyCellId + " with class containing 'safe' and text containing '" + expectedCount + "'";
		var browser = new Browser();
		browser.visit(url).
			then(function() {
				browser.document.grid = self.data;
				var result = browser.evaluate('load()');
			}).
			then(function() {
				var classes = browser.query('[id=' + emptyCellId + ']').className;
				
				if (classes.indexOf('safe') !== -1) {
					throw "Error: #" + emptyCellId + " class = '" + classes + "'"; 
				}
			}).
			then(function() {
				browser.click('[id=' + emptyCellId + ']');
				var classes = browser.query('[id=' + emptyCellId + ']').className;
				
				if (classes.indexOf('safe') === -1) {
					throw "Error: #" + emptyCellId + " class = '" + classes + "'"; 
				}
			}).
			then(function() {
				var text = browser.text('[id=' + emptyCellId + ']');

				if (text != expectedCount) {
					throw "Error: #" + emptyCellId + " text = '" + text + "'"; 
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