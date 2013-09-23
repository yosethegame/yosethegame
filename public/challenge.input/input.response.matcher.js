var Browser = require('zombie');
var Chooser = require('../levels.common/integer.chooser');
var primeFactorsOf = require('../levels.common/prime.factors');

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
		var number = self.numberChooser.getNumber();
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