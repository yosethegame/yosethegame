var cheerio = require('cheerio');

var expectedContent = "A page with an element #title containing 'Minesweeper'";

module.exports = {

	computeStatus: function(remoteResponse, content) {
		var page = cheerio.load(content);

		if (page('#title').length == 0) {
			return {
				code: 501,
				expected: expectedContent,
				got: 'A page missing element #title'
			}
		}
		return {
			code: 501,
			expected: expectedContent,
			got: "#title text = '" +  page('#title').text() + "'"
		}
	},

	validate: function(url, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};