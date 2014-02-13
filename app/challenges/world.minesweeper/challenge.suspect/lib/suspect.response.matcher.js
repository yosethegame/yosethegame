var Browser = require('zombie');

module.exports = {

	data: [
		['empty', 'empty', 'bomb',  'empty', 'bomb',  'empty', 'empty', 'empty'],
		['bomb',  'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb',  'empty', 'empty', 'bomb',  'empty', 'bomb', 'empty', 'bomb' ],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bomb',  'empty', 'empty', 'empty'],
		['empty', 'empty', 'bomb',  'empty', 'bomb',  'bomb',  'empty', 'empty'],
		['bomb' , 'empty', 'empty', 'empty', 'empty', 'empty', 'bomb',  'empty'],
	],
	
	candidates: [
        { row: 2, column: 1 }, 
        { row: 1, column: 5 }, 
        { row: 7, column: 3 }, 
        { row: 4, column: 8 }, 
        { row: 8, column: 1 }, 
        { row: 4, column: 6 }, 
        { row: 1, column: 3 }, 
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
		var cellId = this.cellId(cellIndex);
        var expected = 'A page containing a checkbox with id="suspect-mode" and #' + 
                        cellId + " with class containing 'suspect' and not containing 'lost'";

        var browser = new Browser();
		browser.visit(url).
			then(function() {
				browser.document.grid = self.data;
				var result = browser.evaluate('load()');
			}).
			then(function() {
                if(browser.query('input#suspect-mode[type=checkbox]') === null) {
                    throw 'Error: missing element input#suspect-mode[type=checkbox]';
                }
			}).
			then(function() {
				return browser.check('input#suspect-mode[type=checkbox]');
			}).
			then(function() {
				browser.click('[id=' + cellId + ']');
				var classes = browser.query('[id=' + cellId + ']').className;
				
				if (classes.indexOf('suspect') === -1) {
					throw "Error: #" + cellId + " class = '" + classes + "'"; 
				}

				if (classes.indexOf('lost') !== -1) {
					throw "Error: #" + cellId + " class = '" + classes + "'"; 
				}
			}).
			then(function() {
				callback({
					code: 200,
					expected: expected,
					got: 'it works :)'
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