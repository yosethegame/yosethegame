var FileDatabase = require('./fileDatabase');

function ProductionDatabase() {
	this.levels = [
		{
			number: 1,
			name: 'Get ready',
			challenges: [
				{
					title: 'The ping challenge',
					file: 'public/level.1/ping.html',
					requester: '../level.1/ping.requester.js',
					checker: '../level.1/ping.response.matcher.js'
				},
			]
		},
		{
			number: 2,
			name: 'Prime factors decomposition',
			challenges: [
				{
					title: 'Power of two challenge',
					file: 'public/level.2/power.of.two.html',
					requester: '../level.2/power.of.two.requester.js',
					checker: '../level.2/power.of.two.response.matcher.js'
				},
				{
					title: 'Guard challenge',
					file: 'public/level.2/guard.html',
					requester: '../level.2/guard.requester.js',
					checker: '../level.2/guard.response.matcher.js',
				},
				{
					title: 'Decomposition challenge',
					file: 'public/level.2/decomposition.html',
					requester: '../level.2/decomposition.requester.js',
					checker: '../level.2/decomposition.response.matcher.js',
				}
			]
		},
		{
			number: 3,
			name: 'First UI',
			challenges: [
				{
					title: 'Form challenge',
					file: 'public/level.3/ui.html',
					requester: '../level.3/ui.requester.js',
					checker: '../level.3/ui.response.matcher.js'
				}
			]
		}
	];
};

ProductionDatabase.prototype = new FileDatabase('players');

module.exports = ProductionDatabase;