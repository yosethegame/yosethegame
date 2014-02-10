var abstractMatcher = require('../../common/lib/abstract.prime.factors.decomposition.response.matcher');
var Chooser         = require('../../common/lib/integer.chooser');
var primeFactorsOf  = require('../../common/lib/prime.factors');

module.exports = {

	numberChooser: new Chooser(),
	
	expectedResult: function(number) {
		return number + ' = ' + primeFactorsOf(number).join(' x ');
	},
	
	validate: function(url, remoteResponse, content, callback) {
		abstractMatcher(url, this, callback);
	}
	
};