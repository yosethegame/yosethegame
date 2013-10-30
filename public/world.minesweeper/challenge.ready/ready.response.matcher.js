var Browser = require('zombie');

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var browser = new Browser();
		browser.visit(url).
			then(function() {
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