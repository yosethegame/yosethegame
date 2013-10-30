var cheerio = require('cheerio');

var expectedContentType = 'text/html';
var expectedTitle = 'Prime factors';
var expectedAnswer = { 'content-type': expectedContentType, body: 'Page with title==' + expectedTitle }

var elements = [ '#title', '#invitation', 'input#number', 'button#go' ];


module.exports = {

	expected: 'A form with elements ' + elements.join(' '),

	hasMissing: function(content) {
		var page = cheerio.load(content);
		
		for(var i=0; i<elements.length; i++) {
			if (page(elements[i]).length == 0) return elements[i];
		}
	},
	
	computeStatus: function(remoteResponse, content) {
		if (remoteResponse == undefined 
			|| remoteResponse.headers == undefined 
			|| remoteResponse.headers['content-type'].indexOf('text/html') == -1) {
			return {
				code: 501,
				expected: { 'content-type': 'text/html' },
				got: { 'content-type': (remoteResponse == undefined || remoteResponse.headers == undefined) ? 'text/plain' : remoteResponse.headers['content-type'] }
			}
		}
		
		var missing = this.hasMissing(content);
		if (missing != undefined) {
			return {
				code: 501,
				expected: this.expected,
				got: 'A form missing ' + missing
			}
		}	
		return {
			code: 200,
			expected: this.expected,
			got: this.expected
		}
	},

	validate: function(url, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};