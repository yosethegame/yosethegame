var InMemoryDatabase = require('./inMemoryDatabase');
var thePlayer        = require('../lib/player.utils');

function Example() {
	this.worlds = [
		{
			name: 'world 1',
			levels: [ 
				{
					id: 1,
					title: 'the first challenge',
					requester: '../../../support/empty.request',
					checker: '../../../support/response.always.valid',
					isOpenLevelFor: function(player) { return true; }
				},
				{
					id: 2,
					title: 'the second challenge',
					requester: '../../../support/empty.request',
					checker: '../../../support/response.always.valid',
					isOpenLevelFor: function(player) { return thePlayer.hasDoneLevelWithId(player, 1); }
				},
			],
			isOpenFor: function(player) { return true; }
		},
		{
			name: 'world 2',
			levels: [ 
				{
					id: 3,
					title: 'the third challenge',
					requester: '../../../support/empty.request',
					checker: '../../../support/response.always.valid',
					isOpenLevelFor: function(player) { return thePlayer.hasDoneLevelWithId(player, 2); }
				},
				{
					id: 4,
					title: 'the fourth challenge',
					requester: '../../../support/empty.request',
					checker: '../../../support/response.always.valid',
					isOpenLevelFor: function(player) { return false; }
				},
				{
					id: 5,
					title: 'the fifth challenge',
					requester: '../../../support/empty.request',
					checker: '../../../support/response.always.valid',
					isOpenLevelFor: function(player) { return false; }
				},
				{
					id: 6,
					title: 'the sixth challenge',
					requester: '../../../support/empty.request',
					checker: '../../../support/response.always.valid',
					isOpenLevelFor: function(player) { return false; }
				},
			],
			isOpenFor: function(player) { return thePlayer.hasDoneLevelWithId(player, 2); }
		}
	];
}

Example.prototype = new InMemoryDatabase();

module.exports = Example;