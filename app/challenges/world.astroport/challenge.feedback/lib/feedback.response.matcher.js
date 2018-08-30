var error501 = require('../../../common/lib/501');
var code200 = require('../../../common/lib/200');
var passes = require('../../common/lib/passes');
var cheerio = require('cheerio');
var Browser = require('zombie');

module.exports = {
    
    messages: [ 
        "All #gate-x elements contain class 'free'", 
        "#gate-1 class should contain 'occupied' after docking a ship",
        "#info class should contain 'hidden'",
        "#info class should not contain 'hidden' after a ship is docked",
        "#info class should contain 'hidden' when a ship is entered again"
    ],
    
    willEnterShip: function() {
        var candidates = ['Gros Mollo', 'The Black Pearl', 'Millenium Falcon', 'The Bounty', 'The Great Condor', 'Goldorak'];
        var index = Math.floor(Math.random()*candidates.length);
        return candidates[index];
    },

    validate: function(url, remoteResponse, content, callback) {
        
        var self = this;
        var shipEntered = self.willEnterShip();
        var browser = new Browser();
        var useExpectedMessageIndex = 0;
	    browser.visit(url)
            .then(function() {
                for (var index=1; index<=3 ; index++) {
                    var id = '#gate-' + index;
                    var gate = browser.query(id);
                    if (gate === null) {
                        throw 'Error: element ' + id + ' is missing';
                    }
                    var gateClass = gate.className;
    			    if(gateClass.indexOf('free') === -1) {
                        throw "Error: " + id +" has class '" + gateClass + "'";
    			    }
                }
                return browser;
            })
            .then(function() {
			    if(browser.query('#gate-1').className.indexOf('occupied') !== -1) {
                    useExpectedMessageIndex = 1;
                    throw "Error: #gate-1 has class 'occupied' before docking";
			    }
                return browser;
            })
            .then(function() {
			    if(browser.query('#info') === null) {
                    useExpectedMessageIndex = 2;
                    throw "Error: element #info is missing";
			    }
			    if(browser.query('#info').className.indexOf('hidden') === -1) {
                    useExpectedMessageIndex = 2;
                    throw "Error: #info has class '" + browser.query('#info').className + "'";
			    }
                return browser;
            })
            .then(function() {
                return browser.fill('input#ship', shipEntered);
            })
            .then(function() {
                return browser.pressButton("button#dock");
            })
            .then(function() {
			    if(browser.query('#gate-1').className.indexOf('occupied') === -1) {
                    useExpectedMessageIndex = 1;
                    throw "Error: #gate-1 has class '" + browser.query('#gate-1').className + "'";
			    }
                return browser;
            })
            .then(function() {
			    if(browser.query('#info').className.indexOf('hidden') !== -1) {
                    useExpectedMessageIndex = 3;
                    throw "Error: #info has class '" + browser.query('#info').className + "'";
			    }
                return browser;
            })
            .then(function() {
                return browser.fill('input#ship', shipEntered);
            })
            .then(function() {
			    if(browser.query('#info').className.indexOf('hidden') === -1) {
                    useExpectedMessageIndex = 4;
                    throw "Error: #info has class '" + browser.query('#info').className + "'";
			    }
                return browser;
            })
            .done(
                function() {
                    callback(code200.withValues('Different elements providing feedback to the user', 'You did it!'));
                },
                function(error) {
                    callback(error501.withValues(self.messages[useExpectedMessageIndex], error));
                }
            );            
	}
};