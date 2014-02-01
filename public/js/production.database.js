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
                id: 25,
                title: 'First Web page challenge',
                file: 'public/world.get.ready/challenge.hello.yose/hello.yose.html',
                requester: '../world.get.ready/challenge.hello.yose/hello.yose.requester.js',
                checker: '../world.get.ready/challenge.hello.yose/hello.yose.response.matcher.js',
                isOpenLevelFor: function(player) { return true; }
            },
			{
				id: 1,
				title: 'First Web service challenge',
				file: 'public/world.get.ready/challenge.ping/ping.html',
				requester: '../world.get.ready/challenge.ping/ping.requester.js',
				checker: '../world.get.ready/challenge.ping/ping.response.matcher.js',
                isOpenLevelFor: function(player) { return true; }
			},
			{
				id: 14,
				title: 'Share challenge',
				file: 'public/world.get.ready/challenge.share/share.html',
				requester: '../world.get.ready/challenge.share/share.requester.js',
				checker: '../world.get.ready/challenge.share/share.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneOneOfThoseLevelsWithId(player, [25, 1]); }
			}
		]
	},
	{
		name: 'world 2',
		levels: [ 
			{
				id: 22,
				title: 'Contact information challenge',
				file: 'public/world.get.ready/challenge.contact/contact.html',
				requester: '../world.get.ready/challenge.landing.page/landing.requester.js',
				checker: '../world.get.ready/challenge.contact/contact.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 25); }
			},
			{
				id: 23,
				title: 'Portfolio challenge',
				file: 'public/world.prime.factors/challenge.portfolio/portfolio.html',
				requester: '../world.get.ready/challenge.landing.page/landing.requester.js',
				checker: '../world.prime.factors/challenge.portfolio/portfolio.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 13); }
			},
		]
	},
	{
		name: 'world 3',
		levels: [
			{
				id: 2,
				title: 'Power of two challenge',
				file: 'public/world.prime.factors/challenge.power.of.two/power.of.two.html',
				requester: '../world.prime.factors/challenge.power.of.two/power.of.two.requester.js',
				checker: '../world.prime.factors/challenge.power.of.two/power.of.two.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 1); }
			},
			{
				id: 3,
				title: 'Guard challenge',
				file: 'public/world.prime.factors/challenge.guard.string/guard.html',
				requester: '../world.prime.factors/challenge.guard.string/guard.requester.js',
				checker: '../world.prime.factors/challenge.guard.string/guard.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 2); }
			},
			{
				id: 4,
				title: 'Decomposition challenge',
				file: 'public/world.prime.factors/challenge.decomposition/decomposition.html',
				requester: '../world.prime.factors/challenge.decomposition/decomposition.requester.js',
				checker: '../world.prime.factors/challenge.decomposition/decomposition.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 3); }
			},
			{
				id: 7,
				title: 'Big number guard challenge',
				file: 'public/world.prime.factors/challenge.guard.big.number/big.number.html',
				requester: '../world.prime.factors/challenge.guard.big.number/big.number.requester.js',
				checker: '../world.prime.factors/challenge.guard.big.number/big.number.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 4); }
			},
			{
				id: 12,
				title: 'Multiple entries',
				file: 'public/world.prime.factors/challenge.multiple.entries/multiple.entries.html',
				requester: '../world.prime.factors/challenge.multiple.entries/multiple.entries.requester.js',
				checker: '../world.prime.factors/challenge.multiple.entries/multiple.entries.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 7); }
			},
			{
				id: 5,
				title: 'Form challenge',
				file: 'public/world.prime.factors/challenge.form/form.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.form/form.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 12); }
			},
			{
				id: 6,
				title: 'Input challenge',
				file: 'public/world.prime.factors/challenge.input/input.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.input/input.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 5); }
			},
			{
				id: 8,
				title: 'Resist big number',
				file: 'public/world.prime.factors/challenge.resist.big.number/resist.big.number.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.resist.big.number/resist.big.number.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 6); }
			},
			{
				id: 9,
				title: 'Resist strings',
				file: 'public/world.prime.factors/challenge.resist.strings/resist.strings.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.resist.strings/resist.strings.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 8); }
			},
			{
				id: 10,
				title: 'Resist negative number',
				file: 'public/world.prime.factors/challenge.resist.negative/resist.negative.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.resist.negative/resist.negative.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 9); }
			},
			{
				id: 11,
				title: 'One page',
				file: 'public/world.prime.factors/challenge.one.page/one.page.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.one.page/one.page.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 10); }
			},
			{
				id: 13,
				title: 'List of decomposition',
				file: 'public/world.prime.factors/challenge.list.of.decomposition/list.of.decomposition.html',
				requester: '../world.prime.factors/challenge.form/form.requester.js',
				checker: '../world.prime.factors/challenge.list.of.decomposition/list.of.decomposition.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 11); }
			},
		]
	},
	{
		name: 'world 4',
		levels: [
			{
				id: 15,
				title: 'Minesweeper board challenge',
				file: 'public/world.minesweeper/challenge.board/board.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.board/board.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 25); }
			},
			{
				id: 17,
				title: 'Data injection challenge',
				file: 'public/world.minesweeper/challenge.injection/injection.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.injection/injection.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 15); }
			},
			{
				id: 18,
				title: 'Safe cells challenge',
				file: 'public/world.minesweeper/challenge.safe/safe.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.safe/safe.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 17); }
			},
			{
				id: 19,
				title: 'Zero mine around challenge',
				file: 'public/world.minesweeper/challenge.zero/zero.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.zero/zero.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 18); }
			},
			{
				id: 20,
				title: 'Open field challenge',
				file: 'public/world.minesweeper/challenge.open/open.html',
				requester: '../world.minesweeper/challenge.board/board.requester.js',
				checker: '../world.minesweeper/challenge.open/open.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 19); }
			},
            {
                id: 24,
                title: 'Random grid challenge',
                file: 'public/world.minesweeper/challenge.random/random.html',
                requester: '../world.minesweeper/challenge.board/board.requester.js',
                checker: '../world.minesweeper/challenge.random/random.response.matcher.js',
				isOpenLevelFor: function(player) { return thisPlayer.hasDoneLevelWithId(player, 20); }
            }		
		]
	}
	];
	
	this.worlds[0].isOpenFor = function(player) { return true; };
	
	this.worlds[1].isOpenFor = function(player) { 
		if (thisPlayer.isANew(player)) return false;
		return thisPlayer.hasDoneLevelWithId(player, 25);
	};
	
	this.worlds[2].isOpenFor = function(player) { 
		if (thisPlayer.isANew(player)) return false;
		return thisPlayer.hasDoneLevelWithId(player, 1);
	};
	
	this.worlds[3].isOpenFor = function(player) { 
		if (thisPlayer.isANew(player)) return false;
		return thisPlayer.hasDoneLevelWithId(player, 25);
	};
	
}

ProductionDatabase.prototype = new PSql(process.env.DATABASE_URL);

module.exports = ProductionDatabase;