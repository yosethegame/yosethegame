var abstractMatcher = require('../js/abstract.response.matcher');
var primeFactorsOf = require('../levels.common/prime.factors');
var array = require('../js/utils/array.utils');

module.exports = {

	expectedContent: function(url) {
		params = require('url').parse(url, true);
		var expectedContent = [];
		var numbers = params.query.number;
		if (typeof numbers == 'string') {
			numbers = [numbers];
		}
		array.forEach(numbers, function(number) {
			expectedContent.push({
				number: parseInt(number),
				decomposition: primeFactorsOf(parseInt(number))
			});
		});
		return expectedContent;
	},
		
	validate: function(request, remoteResponse, content, callback) {		
		return abstractMatcher(request, remoteResponse, content, this, callback);
	}
};


