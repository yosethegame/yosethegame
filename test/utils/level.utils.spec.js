var insert		= require('../../public/js/utils/level.utils');
var $ 			= require('jquery');
var cheerio		= require('cheerio');

describe('Level utils:', function() {
	var page;
	var level;
	
	beforeEach(function() {	
		$('body').append('<label id="level-number">42</label>');
		$('body').append('<label id="level-name">Universe</label>');

		html = insert.levelIn($('body').html(), { number: 1, name: 'level 1'});	
		page = cheerio.load(html);
	});
	
	afterEach(function() {
		$('#level-number').remove();
		$('#level-name').remove();
	});

	it('displays level 1', function() {
		expect(page('#level-number').text()).toEqual('1');
	});
	
	it('displays the name of level 1', function() {
		expect(page('#level-name').text()).toEqual('level 1');
	});
		
});