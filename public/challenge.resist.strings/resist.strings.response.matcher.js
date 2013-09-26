var Chooser = require('../levels.common/string.chooser');
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
		var browser = new Browser();
		browser.visit(url).
			then(function () {
				return browser.fill('input#number', number)
					   		  .pressButton("button#go");
			}).
			then(function() {
				if(browser.query('#result') == null) {
					throw 'Error: missing element #result';
				}
			}).
			then(function() {				
				var result = browser.text('#result');
				var expectedResult = self.expectedResult(number);
				callback({
					code: result == expectedResult ? 200 : 501,
					expected: self.expectedAnswer(number),
					got: "#result containing '" + result + "'"
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: self.expectedAnswer(number),
					got: error.toString()
				})
			});	
	}
	
};