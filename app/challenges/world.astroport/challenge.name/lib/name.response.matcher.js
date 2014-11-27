var error501 = require('../../../common/lib/501');
var code200 = require('../../../common/lib/200');
var cheerio = require('cheerio');

module.exports = {

    expected: 'A page containing an element #astroport-name',
	
    validate: function(url, remoteResponse, content, callback) {

        if (remoteResponse.statusCode !== 200) {
            callback(error501.withValues(this.expected, 'Error: 404'));
            return;
        }

        if (remoteResponse.headers === undefined) {
            callback(error501.withValues(this.expected, 'Error: missing content-type'));
            return;
        }
        
        if (remoteResponse.headers['content-type'] !== 'text/html') {
            callback(error501.withValues(this.expected, 'Error: content-type ' + remoteResponse.headers['content-type']));
            return;
        }

        var document = cheerio.load(content);
        if (document('#astroport-name').length === 0) {
            callback(error501.withValues(this.expected, 'Error: missing element #astroport-name'));
            return;
        }

        callback(code200.withValues(this.expected, this.expected));
	}
};