var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var playground	= require('../../public/feature.playground/display.playground.request.js');
var response	= require('../support/fake.response');

describe('Control Access', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		player = {
			login: 'ericminio'
		}
		database.players = [ player ];
	});

	describe('when player is known', function() {
		
		beforeEach(function() {
			playground({ url: '/players/ericminio/play/world/1' }, response, database);
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
			playground({ url: '/players/any/play/world/1' }, response, database);
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
			database.worlds[1].isOpenFor = function(player) { return false; }
			playground({ url: '/players/ericminio/play/world/2' }, response, database);
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
	
	describe('when the world id is unknown', function() {
		
		beforeEach(function() {
			database.worlds[1].isOpenFor = function(player) { return false; }
			playground({ url: '/players/ericminio/play/world/22' }, response, database);
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
	
	describe('when the world id is corrupted', function() {
		
		beforeEach(function() {
			database.worlds[1].isOpenFor = function(player) { return false; }
			playground({ url: '/players/ericminio/play/world/any' }, response, database);
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
			database.worlds[1].isOpenFor = function(player) { return true; }
			player = {
				login: 'ericminio',
				portfolio: [1, 2]
			}
			database.players = [ player ];
			playground({ url: '/players/ericminio/play/world/1' }, response, database);
			page = cheerio.load(response.html);
		});

		it('info section is visible', function() {
			expect(page('#info').attr('class')).toContain('visible');
		});
		
		it('mentions that this world is completed', function() {
			expect(page('#info').text()).toEqual('this world is completed');
		});
		
		it('player section is hidden', function() {
			expect(page('#player').attr('class')).toContain('hidden');
		});

	});
});