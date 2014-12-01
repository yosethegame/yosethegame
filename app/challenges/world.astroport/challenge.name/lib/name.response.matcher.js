var passes = require('../../common/lib/passes');
var error501 = require('../../../common/lib/501');
var code200 = require('../../../common/lib/200');
var cheerio = require('cheerio');

module.exports = {

    expected: 'A page containing an element #astroport-name',
    
    name: 'Astroport name challenge response matcher',
	
    validate: function(url, remoteResponse, content, callback) {

        if (! passes.basicVerifications(remoteResponse, callback)) {
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