var InMemoryDatabase = require('./inMemoryDatabase');

function Example() {
	this.levels = [
		{ 
			number: 1,
			name: 'level 1',
			challenges: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' } ]
		},
		{ 
			number: 2,
			name: 'level 2',
			challenges: [ { title: 'challenge 2.1' }, { title: 'challenge 2.2' } ]
		}
	];
};

Example.prototype = new InMemoryDatabase();

module.exports = Example;