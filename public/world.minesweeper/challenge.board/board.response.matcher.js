var cheerio = require('cheerio');

var expectedContent = "A page with an element #title containing 'Minesweeper' AND a 8x8 cells grid";

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
		if (page('#title').text().indexOf('Minesweeper') == -1) {
			return {
				code: 501,
				expected: expectedContent,
				got: "#title text = '" +  page('#title').text() + "'"
			}
		}
		return {
			code: 501,
			expected: expectedContent,
			got: "missing element #cell-1x3"
		}
	},

	validate: function(url, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};