var cheerio 	 = require('cheerio');
var dashboard	 = require('../public/js/dashboard.js');

describe('Dashboard', function() {
	var page;

	beforeEach(function() {	
		page = cheerio.load(dashboard.html());
	});
	
	describe('The elements of the page', function() {

		it('The title', function() {			
			expect(page('title').text()).toBe('Dashboard');
		});		

		it('The placeholder of the avatar', function() {
			expect(page('#player img').length).toNotBe(0);
		});
	});
	
	describe('when player is unknown', function() {
		
		it('displays unknow player mention', function() {
			expect(page('#info').text()).toEqual('Unknown player');
		});
	});
	
	describe('when player is known', function() {
	
		aMemoryRepoWithPlayers = function(players) {
			
		}
	
		beforeEach(function() {
			dashboard.useRepository(aMemoryRepoWithPlayers([
				{
					avatar: 'this-avatar'
				}
				]));
		})
	
		it('displays its avatar', function() {
			expect(page('#player img').attr('src')).toBe('this-avatar');
		});
	});
});