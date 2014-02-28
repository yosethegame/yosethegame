var abstractMatcher = require('../../../common/lib/abstract.response.matcher');
var primeFactorsOf = require('../../common/lib/prime.factors');
var translateIntoNumeral = require('./translate.into.numeral');
var array = require('../../../../utils/lib/array.utils');
var translateIntoRoman = require('./translate.into.roman');

module.exports = {

	expectedContent: function(url) {
		var numberIndex = url.indexOf('number=');
		var roman = url.substring(numberIndex + 'number='.length);
		var numeral = translateIntoNumeral(roman);
		var primeFactors = primeFactorsOf(numeral);
		var primeFactorsIntoRoman = [];
		array.forEach(primeFactors, function(prime) {
            primeFactorsIntoRoman.push(translateIntoRoman(prime));
		});
		
		return {
			number: roman,
			decomposition: primeFactorsIntoRoman
		};
	},
		
	validate: function(request, remoteResponse, content, callback) {		
		return abstractMatcher(request, remoteResponse, content, this, callback);
	}
};


