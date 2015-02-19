var cheerio = require('cheerio');
var abstractMatcher = require('../../../common/lib/abstract.response.matcher');

module.exports = {

    expected: "a link a#astroport-link with a text and href attribute set to /astroport",

    computeStatus: function(remoteResponse, content) {
		var page = cheerio.load(content);

        if (page('a#astroport-link').length === 0) {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: missing element a#astroport-link'
            };
        }
        
        var text = page('a#astroport-link').text();
        if (text.trim() === '') {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: a#astroport-link should have a text'
            };
        }

        var href = page('a#astroport-link').attr('href');
        if (href === undefined || href.trim() !== '/astroport') {
            return {
                code: 501,
                expected: this.expected,
                got: 'Error: a#astroport-link should have a href set to /astroport'
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