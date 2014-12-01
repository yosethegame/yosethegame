var passes = require('../../common/lib/passes');
var cheerio = require('cheerio');
var error501 = require('../../../common/lib/501');
var code200 = require('../../../common/lib/200');

module.exports = {

    expected: '3 gates containing each a place for a ship',
    
    name: 'Gates challenge response matcher',
    
    validate: function(url, remoteResponse, content, callback) {

        if (! passes.basicVerifications(remoteResponse, callback)) {
            return;
        }
        
        var self = this;
        var document = cheerio.load(content);
        
        for (var index=1; index<=3; index++) {            
            if (document('#gate-' + index).length == 0) {
                callback(error501.withValues(self.expected, 'Error: missing element #gate-' + index ));
                return;
            }
        }
        for (var index=1; index<=3; index++) {            
            if (document('#gate-' + index + ' #ship-' + index).length == 0) {
                callback(error501.withValues(self.expected, 'Error: missing element #ship-' + index + ' in element #gate-' + index ));
                return;
            }
        }
                
        callback(code200.withValues(this.expected, this.expected));
	}
};