var Browser = require('zombie');

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var browser = new Browser();
		browser.visit(url).
			then(function() {
				if(browser.evaluate("typeof play") != 'function') {
					throw 'Error: missing play() method';
				}
				callback({
					code: 200,
					expected: "A play() method",
					got: "A play() method"
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: "A play() method",
					got: error.toString()
				});
			});	
	}
	
};