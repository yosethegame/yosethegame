var cheerio 	 = require('cheerio');
var Dashboard	 = require('../public/js/dashboard.js');

describe('Dashboard >', function() {
	
	var page;
	var dashboard;
	
	beforeEach(function() {	
		dashboard = new Dashboard('ericminio');
	});

	describe('Core >', function() {
	
		beforeEach(function() {	
			page = cheerio.load(dashboard.html());
		});

		it('can remember a given repository', function() {
			var repo = {};
			dashboard.useRepository(repo);
			
			expect(dashboard.repository).toEqual(repo);
		});
		
		it('remembers the requested login', function() {
			expect(dashboard.login).toEqual('ericminio');
		})

		describe('The elements of the page:', function() {

			it('The title', function() {			
				expect(page('title').text()).toBe('Dashboard');
			});		
			
			describe('The placeholder of the information messages', function() {
				
				it('exists', function() {
					expect(page('#info').length).toNotBe(0);
				});

				it('appears as an error', function() {
					expect(page('#info').attr('class')).toContain('text-error');
				});

				it('is visible by default', function() {
					expect(page('#info').attr('class')).toContain('visible');
				});
			});

			describe('The placeholder of the avatar', function() {
				
				it('exists', function() {
					expect(page('#player img').length).toNotBe(0);
				});

				it('is bounded in a square', function() {
					expect(page('#player img').attr('width')).toEqual('60');
					expect(page('#player img').attr('height')).toEqual('60');
				});
				
				it('appears in a circle', function() {
					expect(page('#player img').attr('class')).toEqual('img-circle');
				});
			});	
			
			describe('The placeholder of the player', function() {
				
				it('exists', function() {
					expect(page('#player').length).toNotBe(0);
				});
				
				it('is hidden by default (no repository)', function() {
					expect(page('#player').attr('class')).toContain('hidden');
				});
			});		
		});
	});
	
	describe('when the player is known:', function() {
	
		var repository = {
			find: function() { return { login: 'ericminio', avatar: 'this-avatar' }; }
		};
		
		beforeEach(function() {	
			dashboard.useRepository(repository);
			page = cheerio.load(dashboard.html());
		});

		it('displays its avatar', function() {
			expect(page('#player img').attr('src')).toBe('this-avatar');
		});

		it('hides the info section', function() {
			expect(page('#info').attr('class')).toContain('hidden');
			expect(page('#info').attr('class')).toNotContain('visible');
		});
	});
	
	describe('when the requested player is unknown:', function() {
		
		var repository = {
			find: function() { return undefined; }
		};
		
		beforeEach(function() {	
			dashboard.useRepository(repository);
			page = cheerio.load(dashboard.html());
		});

		it('displays unknow player mention', function() {
			expect(page('#info').text()).toEqual('Unknown player');
		});
		
		it('hides the player section', function() {
			expect(page('#player').attr('class')).toContain('hidden');
			expect(page('#player').attr('class')).toNotContain('visible');
		});
		
	});
	
});