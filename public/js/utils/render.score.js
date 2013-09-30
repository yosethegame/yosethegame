var renderScore = function(score) {
	return leadingZeros(score) + withoutLeadingZeros(score);
};

var withoutLeadingZeros = function(score) {
	if (score > 1e6) return '999999';
	if (score == undefined) score = '';
	if (score == 0) score = '';
	
	return '' + score;
};

var leadingZeros = function(score) {
	if (score == undefined) score = '';
	if (score == 0) score = '';
	var digitCount = ('' + score).length;
	
	return Array(7-digitCount).join('0');
};

try {
	module = module || {};
}
catch(e) {
	module = {};
}

module.exports = renderScore;
module.exports.withoutLeadingZeros = withoutLeadingZeros;
module.exports.leadingZeros = leadingZeros;