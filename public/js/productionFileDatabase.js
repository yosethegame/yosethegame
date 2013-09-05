var FileDatabase = require('./fileDatabase');

function ProductionFileDatabase() {
	this.challenges = [
		{
			title: 'Get ready',
			file: 'public/challenge.ping/ping.html',
			requester: '../challenge.ping/ping.requester.js',
			checker: '../challenge.ping/ping.response.matcher.js'
		},
		{
			title: 'Power of two challenge',
			file: 'public/challenge.primeFactors/power.of.two.html',
			requester: '../challenge.primeFactors/power.of.two.requester.js',
			checker: '../challenge.primeFactors/power.of.two.response.matcher.js'
		}
	];
};

ProductionFileDatabase.prototype = new FileDatabase('players');

module.exports = ProductionFileDatabase;