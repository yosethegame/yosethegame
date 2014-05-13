var primeFactorsOf  = require('../../common/lib/prime.factors');
var givenContent = require('../../../common/lib/is.missing.element');
var Browser = require('zombie');

module.exports = {

    validate: function(url, remoteResponse, content, callback) {
        var self = this;
        var number = self.numberChooser.getNumber();
        var result = number + ' = ' + primeFactorsOf(number).join(' x ');
        var expected = "#last-decomposition containing '" + result + "'";

        if (givenContent.isMissingElement('#last-decomposition', content)) {
            callback({
                code: 501,
                expected: expected,
                got: "#last-decomposition is missing"
            });
        }
        else {
            var browser = new Browser();
            browser.visit(url).
                then(function () {
                    return browser.fill('input#number', number).pressButton("button#go");
                }).
                then(function() {
                    var browser = new Browser();
                    browser.visit(url).
                        then(function() {
                            var lastDecomposition = browser.text('#last-decomposition');
                            callback({
                                code: lastDecomposition == result ? 200 : 501,
                                expected: expected,
                                got: "#last-decomposition containing '" + lastDecomposition + "'"
                            });
                        }).
                        fail(function(error) {
                            callback({
                                code: 501,
                                expected: expected,
                                got: error.toString()
                            });
                        });	                }).
                fail(function(error) {
                    callback({
                        code: 501,
                        expected: expected,
                        got: error.toString()
                    });
                });
        }

    }

};