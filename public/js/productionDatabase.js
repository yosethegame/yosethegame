var FileDatabase = require('./fileDatabase');

function ProductionDatabase() {
	this.levels = [
		{
			number: 1,
			name: 'Get ready',
			challenges: [
				{
					title: 'The ping challenge',
					file: 'public/challenge.ping/ping.html',
					requester: '../challenge.ping/ping.requester.js',
					checker: '../challenge.ping/ping.response.matcher.js'
				},
			]
		},
		{
			number: 2,
			name: 'Prime factors decomposition',
			challenges: [
				{
					title: 'Power of two challenge',
					file: 'public/challenge.primeFactors/power.of.two.html',
					requester: '../challenge.primeFactors/power.of.two.requester.js',
					checker: '../challenge.primeFactors/power.of.two.response.matcher.js'
				},
				{
					title: 'Guard challenge',
					file: 'public/challenge.primeFactors/guard.html',
					requester: '../challenge.primeFactors/guard.requester.js',
					checker: '../challenge.primeFactors/guard.response.matcher.js',
				},
				{
					title: 'Decomposition challenge',
					file: 'public/challenge.primeFactors/decomposition.html',
					requester: '../challenge.primeFactors/decomposition.requester.js',
					checker: '../challenge.primeFactors/decomposition.response.matcher.js',
				}
			]
		}
	];
};

ProductionDatabase.prototype = new FileDatabase('players');

module.exports = ProductionDatabase;