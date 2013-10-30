var Browser 		= require('zombie');
var Chooser 		= require('../../levels.common/integer.chooser');
var primeFactorsOf	= require('../../levels.common/prime.factors');

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
		var browser = new Browser();
		browser.visit(url).
			then(function () {
				return browser.fill('input#number', number)
					   		  .pressButton("button#go");
			}).
			then(function() {
				if(browser.location != url) {
					throw "browser.location '" + browser.location + "'";
				}
				if(browser.query('#result') == null) {
					throw 'Error: missing element #result';
				}
				var result = browser.text('#result');
				var expectedResult = self.expectedResult(number);
				callback({
					code: result == expectedResult ? 200 : 501,
					expected: "browser.location '" + url +"' AND " + self.expectedAnswer(number),
					got: "browser.location '" + url +"' AND #result containing '" + result + "'"
				})
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: "browser.location '" + url +"' AND " + self.expectedAnswer(number),
					got: error.toString()
				})
			});	
	}
	
};