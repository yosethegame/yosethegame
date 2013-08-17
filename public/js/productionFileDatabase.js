var FileDatabase = require('./fileDatabase');

function ProductionFileDatabase() {
	this.challenges = [
		{
			title: 'Get ready',
			file: 'public/challenge.ping/ping.html'
		}
	];
};

ProductionFileDatabase.prototype = new FileDatabase('players');

module.exports = ProductionFileDatabase;