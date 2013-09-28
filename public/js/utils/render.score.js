var renderScore = function(score) {
	if (score > 1e6) return '999999';
	if (score == undefined) score = 0;
	
	var digitCount = ('' + score).length;
	return Array(7-digitCount).join('0') + score;
};

try {
	module = module || {};
}
catch(e) {
	module = {};
}

module.exports = renderScore;