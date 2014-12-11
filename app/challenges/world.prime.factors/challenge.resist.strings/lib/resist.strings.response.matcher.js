var Chooser = require('../../common/lib/string.chooser');
var Browser = require('zombie');

module.exports = {

	stringChooser: new Chooser(),
	
	getInput: function() {
		return '2' + this.stringChooser.getString();
	},
	
	expectedResult: function(input) {
		return input + ' is not a number';
	},
	
	expectedAnswer: function(number) {
		return "#result containing '" + this.expectedResult(number) + "'";
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var number = this.getInput();
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
                if (result !== expectedResult) {
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