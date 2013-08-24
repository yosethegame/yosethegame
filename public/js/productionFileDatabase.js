var FileDatabase = require('./fileDatabase');

function ProductionFileDatabase() {
	this.challenges = [
		{
			title: 'Get ready',
			file: 'public/challenge.ping/ping.html'
		},
		{
			title: 'Power of two challenge',
			file: 'public/challenge.primeFactors/power.of.two.html'
		}
	];
};

ProductionFileDatabase.prototype = new FileDatabase('players');

module.exports = ProductionFileDatabase;