var Browser         = require('zombie');
var Chooser         = require('../../common/lib/integer.chooser');
var primeFactorsOf	= require('../../common/lib/prime.factors');

module.exports = {

	numberChooser: new Chooser(),
	
	expectedResult: function(number) {
		return number + ' = ' + primeFactorsOf(number).join(' x ');
	},
	
	expectedAnswer: function(number) {
		return "#result containing '" + this.expectedResult(number) + "'";
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var number = this.numberChooser.getNumber();
        var expected = "browser.location '" + url +"' AND " + self.expectedAnswer(number);
		var browser = new Browser();
		browser.visit(url).
			then(function () {
				return browser.fill('input#number', number);
			}).
			then(function () {
				return browser.pressButton("button#go");
			}).
			then(function() {
				if(browser.location.toString() !== url) {
					throw "browser.location '" + browser.location + "'";
				}
				if(browser.query('#result') === null) {
					throw 'Error: missing element #result';
				}
				var result = browser.text('#result');
				var expectedResult = self.expectedResult(number);
                if (result !== expectedResult) {
                    throw "browser.location '" + url +"' AND #result containing '" + result + "'";
                }
			}).
			done(
                function() {
    				callback({
    					code: 200,
    					expected: expected,
    					got: expected
    				});
                },
                function(error) {
                    callback({
					    code: 501,
                        expected: expected,
                        got: error.toString()
                    });
                }
            );	
	}
	
};