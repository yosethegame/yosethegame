var Browser = require('zombie');

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		var expected = "a page containing a#repository-link AND a repository with a readme file containing 'YoseTheGame'";

		var browser = new Browser();
		browser.visit(url).
			then(function () {
				if(browser.query('a#repository-link') == null) {
					throw 'Error: missing element a#repository-link';
				}
				return browser.clickLink('a#repository-link');
			}).
			then(function() {
				if(browser.query('#readme') == null) {
					throw 'Error: missing element #readme';
				}
				if(browser.text('#readme').indexOf('YoseTheGame') == -1) {
					throw "Error: missing reference to 'YoseTheGame' in element #readme";
				}
				callback({
					code: 200,
					expected: expected,
					got: expected,
				})
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