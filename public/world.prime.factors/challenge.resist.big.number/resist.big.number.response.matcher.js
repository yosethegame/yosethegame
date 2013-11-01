var abstractMatcher = require('../../levels.common/abstract.prime.factors.decomposition.response.matcher');
var Chooser         = require('../../levels.common/big.integer.chooser');

module.exports = {

	numberChooser: new Chooser(),
	
	expectedResult: function(number) {
		return 'too big number (>1e6)';
	},
	
	validate: function(url, remoteResponse, content, callback) {
		abstractMatcher(url, this, callback);
	}
	
};