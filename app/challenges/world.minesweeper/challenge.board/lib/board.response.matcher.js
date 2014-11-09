var Browser = require('zombie');

var expectedContent = "A #title containing 'Minesweeper' AND a 8x8 cells grid";

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		var browser = Browser.create();
		browser.visit(url).
			then(function() {
				if(browser.query('#title') === null) {
					throw 'Error: missing element #title';
				}
			}).
			then(function() {
				var title = browser.text('#title');
				if (title.indexOf('Minesweeper') === -1) {
					throw "Error: #title text = '" + title + "'";
				}
			}).
			then(function() {
				for(var line=1; line<=8; line++) {
					for(var column=1; column<=8; column++) {
						var cell = '#cell-' + line + 'x' + column;
						if (browser.query(cell) === null) {
                            throw 'Error: missing element ' + cell;
						}
					}
				}	
			}).
			done(
                function() {
					callback({
						code: 200,
						expected: expectedContent,
						got: "#title containing 'Minesweeper' and 8x8 cells grid"
					});
                }, 
                function(error) {
				    callback({
					    code: 501,
                        expected: expectedContent,
                        got: error.toString()
				    });
			});	
	}
	
};