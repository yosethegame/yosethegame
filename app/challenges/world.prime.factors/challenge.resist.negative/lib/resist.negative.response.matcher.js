var Chooser = require('../../common/lib/negative.integer.chooser');
var Browser = require('zombie');

module.exports = {

	numberChooser: new Chooser(),
	
	expectedResult: function(input) {
		return input + ' is not an integer > 1';
	},
	
	expectedAnswer: function(number) {
		return "#result containing '" + this.expectedResult(number) + "'";
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var number = this.numberChooser.getNumber();
		var browser = Browser.create();
		browser.visit(url).
			then(function () {
                return browser.fill('input#number', number).pressButton("button#go");
			}).
			then(function() {
				if(browser.query('#result') === null) {
					throw 'Error: missing element #result';
				}
			}).
			then(function() {				
				var result = browser.text('#result');
				var expectedResult = self.expectedResult(number);
                if (result != expectedResult) {
                    throw "#result containing '" + result + "'";
                }
			}).
			done(
                function() {
    				callback({
    					code: 200,
    					expected: self.expectedAnswer(number),
    					got: self.expectedAnswer(number)
    				});
                }, 
                function(error) {
				    callback({
					    code: 501,
                        expected: self.expectedAnswer(number),
                        got: error.toString()
                    });
			    }
            );	
	}
	
};