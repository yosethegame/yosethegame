var Browser = require('zombie');

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		var self = this;

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
				
				callback({
					code: 200,
					expected: "a page containing a#repository-link AND a repository with a readme file containing 'YoseTheGame'",
					got: "a page containing a#repository-link AND a repository with a readme file containing 'YoseTheGame'",
				})
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: "a page containing a#repository-link AND a repository with a readme file containing 'YoseTheGame'",
					got: error.toString()
				});
			});
			
	}
	
};