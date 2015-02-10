renderScore = function(score) {
	return leadingZeros(score) + withoutLeadingZeros(score);
};

withoutLeadingZeros = function(score) {
	if (score > 1e6) return '999999';
	if (score === undefined) score = '';
	if (score === 0) score = '';
	
	return '' + score;
};

leadingZeros = function(score) {
	if (score === undefined) score = '';
	if (score === 0) score = '';
	var digitCount = ('' + score).length;
	
	return Array(7-digitCount).join('0');
};
