var Browser = require('zombie');

var expectedAnswer = function(matcher, number) {
	return "#result containing '" + matcher.expectedResult(number) + "'";
};

var validate = function(url, matcher, callback) {
	var number = matcher.numberChooser.getNumber();
	var browser = new Browser();
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
			var expectedResult = matcher.expectedResult(number);
            if (result !== expectedResult) {
                throw "#result containing '" + result + "'";
            }
		}).
		done(
            function() {
			    callback({
				    code: 200,
                    expected: expectedAnswer(matcher, number),
                    got: "#result containing '" + browser.text('#result') + "'"
                });
            }, 
            function(error) {
			    callback({
				    code: 501,
                    expected: expectedAnswer(matcher, number),
                    got: error.toString()
                });
		    }
        );	
};

module.exports = validate;