var insert		= require('../../public/js/utils/level.utils');
var Example		= require('../support/database.with.levels');
var $ 			= require('jquery');
var cheerio		= require('cheerio');

describe('Level utils:', function() {
	var database;
	var page;
	var player;
	
	beforeEach(function() {	
		$('body').append('<label id="level-number">42</label>');
		$('body').append('<label id="level-name">Universe</label>');
		
		database = new Example();
	});
	
	afterEach(function() {
		$('#level-number').remove();
		$('#level-name').remove();
	});

	describe('When the player has an empty portfolio,', function() {
	
		beforeEach(function() {
			player = { 
				login: 'ericminio', 
			};			
			database.players = [player];
			html = insert.levelIn($('body').html(), player, database);	
			page = cheerio.load(html);
		});
	
		it('displays level 1', function() {
			expect(page('#level-number').text()).toEqual('1');
		});
		
		it('displays the name of level 1', function() {
			expect(page('#level-name').text()).toEqual('level 1');
		});
	});
	
});