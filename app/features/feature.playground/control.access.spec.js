var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var playground	= require('./lib/display.playground.request.js');
var response	= require('../../support/fake.response');
var array		= require('../../utils/lib/array.utils');
var logSuccess	= require('../feature.try/lib/log.success');

describe('Control Access', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; };
		database.worlds[1].isOpenFor = function(player) { return true; };
		player = {
			login: 'ericminio'
		};
		database.players = [ player ];
	});

	describe('when player is known', function() {
		
		beforeEach(function() {
			playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('unknown player mention is hidden', function() {
			expect(page('#info').attr('class')).toContain('hidden');
		});

		it('player section is visible', function() {
			expect(page('#player').attr('class')).toContain('visible');
		});
	});
	
	describe('when player is unknown', function() {
		
		beforeEach(function() {
			playground({ url: '/players/any/play/world/1/level/1' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('unknown player mention is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});

		it('mentions that this player is unknown', function() {
			expect(page('#info').text()).toEqual('this player is unknown');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});
	});
	
	describe('when world is locked for the player', function() {
		
		beforeEach(function() {
			database.worlds[0].isOpenFor = function(player) { return false; };
			playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this world is locked', function() {
			expect(page('#info').text()).toEqual('this world is locked');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});

	});
	
	describe('when the world number is unknown', function() {
		
		beforeEach(function() {
			database.worlds[1].isOpenFor = function(player) { return false; };
			playground({ url: '/players/ericminio/play/world/22/level/1' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this world is locked', function() {
			expect(page('#info').text()).toEqual('this world is unknown');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});

	});
	
	describe('when the world number is corrupted', function() {
		
		beforeEach(function() {
			database.worlds[1].isOpenFor = function(player) { return false; };
			playground({ url: '/players/ericminio/play/world/any/level/1' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this world is locked', function() {
			expect(page('#info').text()).toEqual('this world is unknown');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});

	});
	
	describe('when the player has completed the world', function() {

		beforeEach(function() {
			player.portfolio = [];
			array.forEach(database.worlds[0].levels, function(level) {
				logSuccess(player, level.id);
			});
			playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
			page = cheerio.load(response.html);
		});

		it('hides the info section', function() {
			expect(page('#info').attr('class')).toContain('hidden');
		});
		
		it('shows the player section', function() {
			expect(page('#player').attr('class')).toContain('visible');
		});
		
		it('hides section next-challenge', function() {
			expect(page('#next-challenge').attr('class')).toContain('hidden');
		});

		it('hides section result', function() {
			expect(page('#result').attr('class')).toContain('hidden');
		});
		
		it('hides section continue', function() {
			expect(page('#continue').attr('class')).toContain('hidden');
		});
		
		it('shows section world-completed', function() {
			expect(page('#world-completed').attr('class')).toContain('visible');
		});

	});
	
	describe('when the level is locked for the player', function() {
		
		beforeEach(function() {
			database.worlds[1].isOpenFor = function(player) { return true; };
			database.worlds[1].levels[2].isOpenLevelFor = function(player) { return false; };
			
			playground({ url: '/players/ericminio/play/world/2/level/3' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this level is locked', function() {
			expect(page('#info').text()).toEqual('this level is locked');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});
	});

	describe('when the level is unknown for the player', function() {
		
		beforeEach(function() {
			var levelNumber = database.worlds[1].length;
			
			playground({ url: '/players/ericminio/play/world/1/level/' + levelNumber }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this level is locked', function() {
			expect(page('#info').text()).toEqual('this level is unknown');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});
	});

	describe('when the level number is corrupted', function() {
		
		beforeEach(function() {
			playground({ url: '/players/ericminio/play/world/1/level/any' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this level is locked', function() {
			expect(page('#info').text()).toEqual('this level is unknown');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});
	});
	
	describe('when the player has completed this level', function() {

		beforeEach(function() {
			player.portfolio = [];
			logSuccess(player, database.worlds[0].levels[0].id);
			playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
			page = cheerio.load(response.html);
		});
		
		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this level is locked', function() {
			expect(page('#info').text()).toEqual('this level is completed');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});
	});
});