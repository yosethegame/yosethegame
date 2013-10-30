var abstractMatcher = require('../../levels.common/abstract.prime.factors.decomposition.response.matcher');
var Chooser 		= require('../../levels.common/integer.chooser');
var primeFactorsOf 	= require('../../levels.common/prime.factors');

module.exports = {

	numberChooser: new Chooser(),
	
	expectedResult: function(number) {
		return number + ' = ' + primeFactorsOf(number).join(' x ');
	},
	
	validate: function(url, remoteResponse, content, callback) {
		abstractMatcher(url, this, callback);
	}
	
};