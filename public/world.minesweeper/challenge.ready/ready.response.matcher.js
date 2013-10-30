var Browser = require('zombie');
var array   = require('../../js/utils/array.utils');

module.exports = {

	expected: "A play() method and onclick attribute of each #cell-NxP set to play(N, P)",

	extractLine: function(id) {
		var xIndex = id.indexOf('x');
		var dashIndex = 4;

		return id.substring(dashIndex+1, xIndex);
	},

	extractColumn: function(id) {
		var xIndex = id.indexOf('x');

		return id.substring(xIndex+1);
	},
	
	extractOnClick: function(cell) {
		var html = cell.outerHTML;
		var onClickIndex = html.indexOf('onclick="');
		var htmlFromOnClick = html.substring(onClickIndex + 9);
		var endOfOnClick = htmlFromOnClick.indexOf('"');
		
		return htmlFromOnClick.substring(0, endOfOnClick);
	},
	
	expectedOnClick: function(cell) {
		return 'play(' + this.extractLine(cell.id) + ', ' + this.extractColumn(cell.id) + ')';
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var browser = new Browser();
		browser.visit(url).
			then(function() {
				if(browser.evaluate("typeof play") != 'function') {
					throw 'Error: missing play() method';
				}
			}).
			then(function() {
				var cells = browser.queryAll('[id^=cell-]');				
				
				array.forEach(cells, function(cell) {
					if (cell.onclick == null) {
						throw 'Error: missing onclick="' + self.expectedOnClick(cell) + '" on #' + cell.id;
					}
				});
			}).
			then(function() {
				var cells = browser.queryAll('[id^=cell-]');				
				
				array.forEach(cells, function(cell) {
					var onclick = self.extractOnClick(cell);
					if (onclick != self.expectedOnClick(cell)) {
						throw 'Error: onclick="' + onclick + '" on #' + cell.id;
					}
				});
			}).
			then(function() {
				callback({
					code: 200,
					expected: self.expected,
					got: self.expected
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: self.expected,
					got: error.toString()
				});
			});	
	}
	
};