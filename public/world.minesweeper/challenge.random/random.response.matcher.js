var Browser = require('zombie');
var equal   = require('deep-equal');

module.exports = {
    
    validate: function(url, remoteResponse, content, callback) {
        var browser = new Browser();
        
        browser.visit(url).
            then(function() {
                var first = browser.evaluate('document.grid');
                browser.visit(url).
                then(function() {
                    var second = browser.evaluate('document.grid');
                    if (equal(second, first)) {
                        callback({
                			code: 501,
                			expected: 'Not always the same document.grid',
                			got: 'The same document.grid'
                		});
                    } else {
                        callback({
                			code: 200,
                			expected: 'Not always the same document.grid',
                			got: 'Not always the same document.grid'
                		});
                    }
                }).
                fail(function(error) {
    				callback({
    					code: 501,
    					expected: 'Not always the same document.grid',
    					got: error.toString()
    				});                
                });                
            }).
            fail(function(error) {
				callback({
					code: 501,
					expected: 'Not always the same document.grid',
					got: error.toString()
				});                
            });        
    }
};