var cheerio = require('cheerio');
var $ = require('jquery');
var abstractMatcher = require('../../js/abstract.response.matcher');

module.exports = {

    expected: "a link a#contact-me-link with a text and a href attribute",

    computeStatus: function(remoteResponse, content) {
		var page = cheerio.load(content);

        if (page('a#contact-me-link').length === 0) {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: missing element a#contact-me-link'
            };
        }
        
        var text = page('a#contact-me-link').text();
        if (text.trim() === '') {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: a#contact-me-link should have a text'
            };
        }

        var href = page('a#contact-me-link').attr('href');
        if (href === undefined || href.trim() === '') {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: a#contact-me-link should have a href'
            };
        }

        return {
			code: 200,
			expected: this.expected,
			got: this.expected
		};
    },

	validate: function(request, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};