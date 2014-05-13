var primeFactorsOf  = require('../../common/lib/prime.factors');
var givenContent = require('../../../common/lib/is.missing.element');

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
            callback({
                code: 200,
                expected: expected,
                got: expected
            });
        }

    }

};