var PSql        = require('./psql.database');
var array		= require('./utils/array.utils');
var withValue	= require('./utils/array.matchers');
var thisPlayer	= require('./utils/player.utils');

var hasAllLevelOfGivenWorldInPortfolio = function(player, world) {
	var hasAll = true;
	array.forEach(world.levels, function(level) {
		if(! thisPlayer.hasDoneThisLevel(player, level)) {
			hasAll = false;
		}
	});
	return hasAll;
};

function ProductionDatabase() {
	self = this;
	
	this.worlds = [
	{
		name: 'world 1',
		levels: [ 
			{
				id: 1,
				title: 'Ping challenge',
				file: 'public/world.get.ready/challenge.ping/ping.html',
				requester: '../world.get.ready/challenge.ping/ping.requester.js',
				checker: '../world.get.ready/challenge.ping/ping.response.matcher.js'
			},
			{
				id: 14,
				title: 'Share challenge',
				file: 'public/world.get.ready/challenge.share/share.html',
				requester: '../world.get.ready/challenge.share/share.requester.js',
				checker: '../world.get.ready/challenge.share/share.response.matcher.js'
			}
		]
	},
	{
		name: 'world 2',
		levels: [
			{
				id: 2,
				title: 'Power of two challenge',
				file: 'public/world.prime.factors/challenge.power.of.two/power.of.two.html',
				requester: '../world.prime.factors/challenge.power.of.two/power.of.two.requester.js',
				checker: '../world.prime.factors/challenge.power.of.two/power.of.two.response.matcher.js'
			},
			{
				id: 3,
				title: 'Guard challenge',
				file: 'public/world.prime.factors/challenge.guard.string/guard.html',
				requester: '../world.prime.factors/challenge.guard.string/guard.requester.js',
				checker: '../world.prime.factors/challenge.guard.string/guard.response.matcher.js',
			},
			{
				id: 4,
				title: 'Decomposition challenge',
				file: 'public/world.prime.factors/challenge.decomposition/decomposition.html',
				requester: '../world.prime.factors/challenge.decomposition/decomposition.requester.js',
				checker: '../world.prime.factors/challenge.decomposition/decomposition.response.matcher.js',
			},
			{
				id: 7,
				title: 'Big number guard challenge',
				file: 'public/world.prime.factors/challenge.guard.big.number/big.number.html',
				requester: '../world.prime.factors/challenge.guard.big.number/big.number.requester.js',
				checker: '../world.prime.factors/challenge.guard.big.number/big.number.response.matcher.js',
			},
			{
				id: 12,
				title: 'Multiple entries',
				file: 'public/world.prime.factors/challenge.multiple.entries/multiple.entries.html',
				requester: '../world.prime.factors/challenge.multiple.entries/multiple.entries.requester.js',
				checker: '../world.prime.factors/challenge.multiple.entries/multiple.entries.response.matcher.js',
			},
			{
				id: 5,
				title: 'Form challenge',
				file: 'public/world.prime.factors/challenge.form/form.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.form/form.response.matcher.js'
			},
			{
				id: 6,
				title: 'Input challenge',
				file: 'public/world.prime.factors/challenge.input/input.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.input/input.response.matcher.js'
			},
			{
				id: 8,
				title: 'Resist big number',
				file: 'public/world.prime.factors/challenge.resist.big.number/resist.big.number.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.resist.big.number/resist.big.number.response.matcher.js',
			},
			{
				id: 9,
				title: 'Resist strings',
				file: 'public/world.prime.factors/challenge.resist.strings/resist.strings.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.resist.strings/resist.strings.response.matcher.js',
			},
			{
				id: 10,
				title: 'Resist negative number',
				file: 'public/world.prime.factors/challenge.resist.negative/resist.negative.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.resist.negative/resist.negative.response.matcher.js',
			},
			{
				id: 11,
				title: 'One page',
				file: 'public/world.prime.factors/challenge.one.page/one.page.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.one.page/one.page.response.matcher.js',
			},
			{
				id: 13,
				title: 'List of decomposition',
				file: 'public/world.prime.factors/challenge.list.of.decomposition/list.of.decomposition.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.list.of.decomposition/list.of.decomposition.response.matcher.js',
			}
		]
	},
	{
		name: 'world 3',
		levels: [
			{
				id: 15,
				title: 'Minesweeper board challenge',
				file: 'public/world.minesweeper/challenge.board/board.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.board/board.response.matcher.js',
			},
			{
				id: 17,
				title: 'Data injection challenge',
				file: 'public/world.minesweeper/challenge.injection/injection.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.injection/injection.response.matcher.js',
			},
			{
				id: 18,
				title: 'Safe cells challenge',
				file: 'public/world.minesweeper/challenge.safe/safe.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.safe/safe.response.matcher.js',
			},
			{
				id: 19,
				title: 'Zero mine around challenge',
				file: 'public/world.minesweeper/challenge.zero/zero.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.zero/zero.response.matcher.js',
			}
		]
	}
	];
	
	this.worlds[0].isOpenFor = function(player) { return true; };
	
	this.worlds[1].isOpenFor = function(player) { 
		if (thisPlayer.isANew(player)) return false;
		if (thisPlayer.hasDoneThisLevel(player, self.worlds[0].levels[0])) return true;
		return false;
	};
	
	this.worlds[2].isOpenFor = this.worlds[1].isOpenFor;
}

ProductionDatabase.prototype = new PSql(process.env.DATABASE_URL);

module.exports = ProductionDatabase;