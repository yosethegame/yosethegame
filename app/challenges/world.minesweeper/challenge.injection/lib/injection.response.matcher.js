var Browser = require('zombie');

module.exports = {

	data: [
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb', 'empty', 'empty', 'bomb', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'bomb', 'empty', 'bomb', 'bomb', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'bomb', 'empty'],
	],
	
	candidates: [
        { row: 2, column: 1}, 
        { row: 4, column: 1}, 
        { row: 7, column: 3}, 
        { row: 4, column: 4}, 
        { row: 6, column: 5}, 
        { row: 7, column: 5}, 
        { row: 7, column: 6}, 
        { row: 8, column: 7}, 
	],
	
	bombIndex: function() {
        return Math.floor(Math.random()*8);
	},
	
	cellId: function(index) {
        var position = this.candidates[index];
        return 'cell-' + position.row + 'x' + position.column;
	},
	
	validate: function(url, remoteResponse, content, callback) {
        var self = this;
		var cellWithBombId = this.cellId(this.bombIndex());
		var expected = "A load() method and #" + cellWithBombId + " class containing 'lost' after click";
		var browser = new Browser();
		browser.visit(url).
			then(function() {
				if(browser.evaluate("typeof load") != 'function') {
					throw 'Error: missing load() method';
				}
			}).
			then(function() {
				browser.document.grid = self.data;
				var result = browser.evaluate('load()');
			}).
			then(function() {
				var classes = browser.query('[id=' + cellWithBombId + ']').className;
				
				if (classes.indexOf('lost') !== -1) {
					throw "Error: #" + cellWithBombId + " class = '" + classes + "' before click"; 
				}
			}).
			then(function() {
				browser.click('[id=' + cellWithBombId + ']');
				var classes = browser.query('[id=' + cellWithBombId + ']').className;
				
				if (classes.indexOf('lost') === -1) {
					throw "Error: #" + cellWithBombId + " class = '" + classes + "'"; 
				}
			}).
			done(
                function() {
                    callback({
                	    code: 200,
                		expected: expected,
                		got: expected
                	});
                },
                function(error) {
                    callback({
					    code: 501,
                        expected: expected,
                        got: error.toString()
				    });
                }
			);
	}
	
};