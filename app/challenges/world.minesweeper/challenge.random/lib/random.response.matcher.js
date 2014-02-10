var Browser     = require('zombie');
var equal       = require('deep-equal');
var error501    = require('../../../common/lib/501');

module.exports = {
    
    expected: 'Not always the same document.grid',
    
    validate: function(url, remoteResponse, content, callback) {
        var self = this;
        var browser = new Browser();
        
        browser.visit(url).
            then(function() {
                var first = browser.evaluate('document.grid');
                browser.visit(url).
                then(function() {
                    var second = browser.evaluate('document.grid');
                    if (equal(second, first)) {
                        throw 'The same document.grid';
                    } else {
                        callback({
                            code: 200,
                            expected: self.expected,
                            got: self.expected
                        });
                    }
                }).
                fail(function(error) {
                    callback(error501.withValues(self.expected, error.toString()));
                });                
            }).
            fail(function(error) {
				callback(error501.withValues(self.expected, error.toString()));
            });        
    }
};