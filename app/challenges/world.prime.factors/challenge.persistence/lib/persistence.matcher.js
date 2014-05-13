var primeFactorsOf  = require('../../common/lib/prime.factors');

module.exports = {

    validate: function(url, remoteResponse, content, callback) {
        var self = this;
        var number = self.numberChooser.getNumber();
        var result = number + ' = ' + primeFactorsOf(number).join(' x ');
        var expected = "#last-decomposition containing '" + result + "'";

        callback({
            code: 200,
            expected: expected,
            got: expected
        });
    }

};