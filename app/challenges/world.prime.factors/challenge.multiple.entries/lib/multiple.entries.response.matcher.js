var abstractMatcher = require('../../../common/lib/abstract.response.matcher');
var primeFactorsOf = require('../../common/lib/prime.factors');
var array = require('../../../../utils/lib/array.utils');

module.exports = {

	expectedContent: function(url) {
		params = require('url').parse(url, true);
		var expectedContent = [];
		var numbers = params.query.number;
		array.forEach(numbers, function(number) {
			if (isNaN(number)) {
				expectedContent.push({
					number: number,
					error: 'not a number'
				});
			}
			else {
				expectedContent.push({
					number: parseInt(number),
					decomposition: primeFactorsOf(parseInt(number))
				});
			}
		});
		return expectedContent;
	},
		
	validate: function(request, remoteResponse, content, callback) {		
		return abstractMatcher(request, remoteResponse, content, this, callback);
	}
};


