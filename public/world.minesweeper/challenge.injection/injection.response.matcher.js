var Browser = require('zombie');

module.exports = {

	data: [
		['bomb' , 'empty', 'bomb' ],
		['empty', 'empty', 'empty'],
	],
	
	line: 1,
	column: 3,

	useData: function(data) {
		this.data = data;
	},
	
	playOnCell: function(line, column) {
		this.line = line;
		this.column = column;
	},

	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var cellId = 'cell-' + self.line +'x' + self.column;
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
				browser.click('[id=' + cellId + ']');
				var classes = browser.query('[id=' + cellId + ']').className;
				
				if (classes.indexOf('lost') === -1) {
					throw "Error: #" + cellId + " class = '" + classes + "'"; 
				}
			}).
			then(function() {
				callback({
					code: 200,
					expected: "A load() method and #" + cellId + " class containing 'lost'",
					got: "A load() method and #" + cellId +" class containing 'lost'"
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: "A load() method and #" + cellId + " class containing 'lost'",
					got: error.toString()
				});
			});
	}
	
};