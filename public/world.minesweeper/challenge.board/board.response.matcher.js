var cheerio = require('cheerio');

module.exports = {

	computeStatus: function(remoteResponse, content) {
		return {
			code: 200,
			expected: '',
			got: ''
		}
	},

	validate: function(url, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};