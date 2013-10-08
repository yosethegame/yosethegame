var InMemoryDatabase = require('./inMemoryDatabase');

function Example() {
	this.levels = [
		{ 
			number: 1,
			name: 'level 1',
			challenges: [ 
				{ 
					title: 'challenge 1.1',
					file: 'public/challenge.ping/ping.html',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				}, 
				{ 
					title: 'challenge 1.2', 
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				} 
			]
		},
		{ 
			number: 2,
			name: 'level 2',
			challenges: [ 
				{ 
					title: 'challenge 2.1', 
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				}, 
				{ 
					title: 'challenge 2.2', 
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				} 
			]
		}
	];
};

Example.prototype = new InMemoryDatabase();

module.exports = Example;