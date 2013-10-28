var Browser = require('zombie');

module.exports = {

	useData: function(data) {
		this.data = data;
	},

	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var browser = new Browser();
		browser.visit(url).
			then(function() {
				callback({
					code: 200,
					expected: 'green',
					got: 'red'
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: 'green',
					got: error.toString()
				});
			});	
	}
	
};