var Chooser         = require('../../common/lib/integer.chooser');
var primeFactorsOf  = require('../../common/lib/prime.factors');
var givenContent    = require('../../../common/lib/is.missing.element');
var Browser         = require('zombie');

module.exports = {

    numberChooser: new Chooser(),

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
            var browser = Browser.create();
            browser.visit(url).
                then(function () {
                    return browser.fill('input#number', number).pressButton("button#go");
                }).
                then(function() {
                    browser = Browser.create();
                    return browser.visit(url);
                }).
                then(function() {
                    var text = browser.text('#last-decomposition');
                    if (text.indexOf(result) === -1) {
                        throw "#last-decomposition with text '" + text + "'";
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
    }

};