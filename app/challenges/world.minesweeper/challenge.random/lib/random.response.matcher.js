var Browser     = require('zombie');
var equal       = require('deep-equal');
var error501    = require('../../../common/lib/501');

module.exports = {
    
    expected: 'Not always the same document.grid',
    
    validate: function(url, remoteResponse, content, callback) {
        var self = this;
        var browser = new Browser();
        
        var first;
        var second;
        browser.visit(url).
            then(function() {
                first = browser.evaluate('document.grid');
            }).
            then(function() {
                return browser.visit(url);
            }).
            then(function() {
                second = browser.evaluate('document.grid');
                if (equal(second, first)) {
                    throw 'The same document.grid';
                }
            }).
            done(   
                function() {
                    callback({
                        code: 200,
                        expected: self.expected,
                        got: self.expected
                    });
                },
                function(error) {
                    callback(error501.withValues(self.expected, error.toString()));
                }
            );                
    }
};