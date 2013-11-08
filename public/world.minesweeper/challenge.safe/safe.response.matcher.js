var Browser = require('zombie');

module.exports = {

	data: [
		['bomb' , 'empty', 'bomb' ],
		['empty', 'empty', 'empty'],
	],
	
	line: 2,
	column: 2,
	expectedCount: '2',

	useData: function(data) {
		this.data = data;
	},
	
	playOnCell: function(line, column) {
		this.line = line;
		this.column = column;
	},
	
	cellId: function() {
        return 'cell-' + this.line +'x' + this.column; 
	},
	
	expectBombAroundCount: function(count) {
        this.expectedCount = count;
	},
	
	expected: function() {
        return "#" + this.cellId() + " with class containing 'safe' and text containing '" + this.expectedCount + "'";
	},

	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var browser = new Browser();
		browser.visit(url).
			then(function() {
				browser.document.grid = self.data;
				var result = browser.evaluate('load()');
			}).
			then(function() {
				browser.click('[id=' + self.cellId() + ']');
				var classes = browser.query('[id=' + self.cellId() + ']').className;
				
				if (classes.indexOf('safe') === -1) {
					throw "Error: #" + self.cellId() + " class = '" + classes + "'"; 
				}
			}).
			then(function() {
				var text = browser.text('[id=' + self.cellId() + ']');
				
				if (text !== self.expectedCount) {
					throw "Error: #" + self.cellId() + " text = '" + text + "'"; 
				}
			}).
			then(function() {
				callback({
					code: 200,
					expected: self.expected(),
					got: self.expected()
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: self.expected(),
					got: error.toString()
				});
			});
	}
	
};