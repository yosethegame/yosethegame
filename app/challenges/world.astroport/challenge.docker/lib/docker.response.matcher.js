var error501 = require('../../../common/lib/501');
var code200 = require('../../../common/lib/200');
var passes = require('../../common/lib/passes');
var cheerio = require('cheerio');
var Browser = require('zombie');

module.exports = {

    expected: 'A page with elements input#ship and button#dock',
    
    willEnterShip: function() {
        var candidates = ['Gros Mollo', 'The Black Pearl', 'Millenium Falcon', 'The Bounty', 'The Great Condor', 'Goldorak'];
        var index = Math.floor(Math.random()*candidates.length);
        return candidates[index];
    },
    
    expectedBehaviour: function(ship) { return this.expected + ', and an element #ship-1 containing "'+ ship +'" after submiting this ship name'; },

    validate: function(url, remoteResponse, content, callback) {
        
        if (! passes.basicVerifications(remoteResponse, callback)) {
            return;
        }
        
        var document = cheerio.load(content);
        
        if (document('input#ship').length === 0) {
            callback(error501.withValues(this.expected, 'Error: missing element input#ship'));
            return;
        }
        if (document('button#dock').length === 0) {
            callback(error501.withValues(this.expected, 'Error: missing element button#dock'));
            return;
        }
        
        var self = this;
        var shipEntered = self.willEnterShip();
        var browser = new Browser();
	    browser.visit(url)
            .then(function() {
                return browser.fill('input#ship', shipEntered).pressButton("button#dock");
            })
            .then(function() {
			    if(browser.query('#ship-1') === null) {
                    throw 'Error: missing element #ship-1';
			    }
                return browser;
            })
            .then(function() {
                var shipFound = browser.text('#ship-1');
                if (shipEntered !== shipFound) {
                    throw "Error: #ship-1 contains '" + shipFound + "'";
                }
                return browser;                
            })
            .done(
                function() {
                    callback(code200.withValues(self.expectedBehaviour(shipEntered), 'You did it!'));
                },
                function(error) {
                    callback(error501.withValues(self.expectedBehaviour(shipEntered), error), browser);
                }
            );
	}
};