var Browser = require('zombie');

var expectedAnswer = function(matcher, number) {
	return "#result containing '" + matcher.expectedResult(number) + "'";
};

var validate = function(url, matcher, callback) {
	var number = matcher.numberChooser.getNumber();
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
			var expectedResult = matcher.expectedResult(number);
			callback({
				code: result == expectedResult ? 200 : 501,
				expected: expectedAnswer(matcher, number),
				got: "#result containing '" + result + "'"
			});
		}).
		fail(function(error) {
			callback({
				code: 501,
				expected: expectedAnswer(matcher, number),
				got: error.toString()
			})
		});	
};

module.exports = validate;