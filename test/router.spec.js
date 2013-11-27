var router = require('../public/js/router.js');

describe('Router', function() {

    describe('Prod configuration:', function() {
	
		it('has routes', function() {
			expect(router.routes.length).toBeGreaterThan(1);
		});

		it('maps dashboard request', function() {
			expect(router.endPointOf({ url: '/players/any' })).toBe(require('../public/feature.dashboard/display.dashboard'));
		});
		
		it('maps dashboard request with a dot in the login', function() {
			expect(router.endPointOf({ url: '/players/any.name' })).toBe(require('../public/feature.dashboard/display.dashboard'));
		});
		
		it('maps dashboard request with a dash in the login', function() {
			expect(router.endPointOf({ url: '/players/any-name' })).toBe(require('../public/feature.dashboard/display.dashboard'));
		});
		
		it('maps dashboard request with a @ in the login', function() {
			expect(router.endPointOf({ url: '/players/any@name' })).toBe(require('../public/feature.dashboard/display.dashboard'));
		});
		
		it('maps static content request', function() {
			expect(router.endPointOf({ url: '/anything-else' }).toString()).toEqual(servecontent('public').toString());
		});
		
		it('maps try-all-up-to request', function() {
			expect(router.endPointOf({ url: '/try?login=ericminio' })).toBe(require('../public/feature.try/try.request'));
		});
		
		it('maps restart-game request', function() {
			expect(router.endPointOf({ url: '/restart-game?login=any' })).toBe(require('../public/feature.restart.game/restart.game'));
		});

		it('maps home page request', function() {
			expect(router.endPointOf({ url: '/' })).toBe(require('../public/js/home.page'));
		});
		
		it('maps create-new-player request', function() {
			expect(router.endPointOf({ url: '/create-new-player' })).toBe(require('../public/feature.create.player/create.player.request.js'));
		});
		
		it('maps create-player post request', function() {
			expect(router.endPointOf({ url: '/create-player' })).toBe(require('../public/feature.create.player/post.new.player.request.js'));
		});
		
		it('maps playground request', function() {
			expect(router.endPointOf({ url: '/players/any/play/world/42' })).toBe(require('../public/feature.playground/display.playground.request.js'));
		});

		it('maps playground request', function() {
			expect(router.endPointOf({ url: '/players/any.name/play/world/42' })).toBe(require('../public/feature.playground/display.playground.request.js'));
		});

		it('maps playground request with a complex name', function() {
			expect(router.endPointOf({ url: '/players/any@name-with.dash.and.dot/play/world/42' })).toBe(require('../public/feature.playground/display.playground.request.js'));
		});
		
		it('maps display settings request', function() {
			expect(router.endPointOf({ url: '/players/any/settings' })).toBe(require('../public/feature.settings/display.settings.request.js'));
		});

		it('maps post settings request', function() {
			expect(router.endPointOf({ url: '/save-settings' })).toBe(require('../public/feature.settings/post.settings.request.js'));
		});

		it('maps rerun request', function() {
			expect(router.endPointOf({ url: '/players/any/rerun/world/42' })).toBe(require('../public/feature.rerun/display.rerun.request.js'));
		});

		it('maps search by tag request', function() {
			expect(router.endPointOf({ url: '/players/tags/any' })).toBe(require('../public/feature.search/search.request.js'));
		});

	});
	
	describe('Compatibility with http module of node.js:', function() {
		
		var server;
		
		beforeEach(function() {
			server = require('http').createServer(function(request, response){
            	router.endPointOf(request)(request, response);
            }).listen(5000, 'localhost');
		});
		
		afterEach(function() {
			server.close();
		});
		
		it('routes as expected', function(done) {
			var called = false;
			router.routes = [ 
				{ 
					pattern: /.*/, 
					target: function(request, response) { 
						called = true; 
						response.end();
					}
				} 
			];

			require('request')("http://localhost:5000/gate", function(error, response, body) {
				expect(called).toBe(true);
				done();
			});
		})
	});
	
});