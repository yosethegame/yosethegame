var PSql = require('./psql.database');

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
					file: 'public/challenge.power.of.two/power.of.two.html',
					requester: '../challenge.power.of.two/power.of.two.requester.js',
					checker: '../challenge.power.of.two/power.of.two.response.matcher.js'
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
				},
				{
					title: 'Input challenge',
					file: 'public/level.3/input.html',
					requester: '../level.3/ui.requester.js',
					checker: '../level.3/input.response.matcher.js'
				}
			]
		}
	];
};

ProductionDatabase.prototype = new PSql(process.env.DATABASE_URL);

module.exports = ProductionDatabase;