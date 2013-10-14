var InMemoryDatabase = require('./inMemoryDatabase');

function Example() {
	this.worlds = [
		{
			name: 'world 1',
			levels: [ 
				{
					id: 1,
					title: 'the first challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
				{
					id: 2,
					title: 'the second challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
			]
		},
		{
			name: 'world 2',
			levels: [ 
				{
					id: 3,
					title: 'the third challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
				{
					id: 4,
					title: 'the fourth challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
				{
					id: 5,
					title: 'the fifth challenge',
					requester: '../../test/support/empty.request',
					checker: '../../test/support/response.always.valid',
				},
			]
		}
	];
};

Example.prototype = new InMemoryDatabase();

module.exports = Example;