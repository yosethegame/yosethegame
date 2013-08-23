primeFactorsOf = function(number) {
	var factors = [];
	var factor = 2;
	while(number % factor == 0) {
		factors.push(factor);
		number = number / factor;
	}
	return factors;
}

module.exports = primeFactorsOf;

