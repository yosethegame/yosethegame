var router = require('./lib/router.js');

describe('Router', function() {

    describe('Prod configuration:', function() {
	
		it('has routes', function() {
			expect(router.routes.length).toBeGreaterThan(1);
		});

		it('maps dashboard request', function() {
			expect(router.endPointOf({ url: '/players/any' })).toBe(require('./features/feature.dashboard/lib/display.dashboard'));
		});
		
		it('maps dashboard request with a dot in the login', function() {
			expect(router.endPointOf({ url: '/players/any.name' })).toBe(require('./features/feature.dashboard/lib/display.dashboard'));
		});
		
		it('maps dashboard request with a dash in the login', function() {
			expect(router.endPointOf({ url: '/players/any-name' })).toBe(require('./features/feature.dashboard/lib/display.dashboard'));
		});
		
		it('maps dashboard request with a @ in the login', function() {
			expect(router.endPointOf({ url: '/players/any@name' })).toBe(require('./features/feature.dashboard/lib/display.dashboard'));
		});
		
		it('maps dashboard request with a number in the login', function() {
			expect(router.endPointOf({ url: '/players/name42' })).toBe(require('./features/feature.dashboard/lib/display.dashboard'));
		});
		
		it('maps static content request', function() {
			expect(router.endPointOf({ url: '/anything-else' }).toString()).toEqual(servecontent('public').toString());
		});
		
		it('maps try-all-up-to request', function() {
			expect(router.endPointOf({ url: '/try?login=ericminio' })).toBe(require('./features/feature.try/lib/try.request'));
		});
		
		it('maps restart-game request', function() {
			expect(router.endPointOf({ url: '/restart-game?login=any' })).toBe(require('./features/feature.restart.game/lib/restart.game'));
		});

		it('maps home page request', function() {
			expect(router.endPointOf({ url: '/' })).toBe(require('./features/feature.welcome/lib/home.page'));
		});
		
		it('maps create-new-player request', function() {
			expect(router.endPointOf({ url: '/create-new-player' })).toBe(require('./features/feature.create.player/lib/create.player.request.js'));
		});
		
		it('maps create-player post request', function() {
			expect(router.endPointOf({ url: '/create-player' })).toBe(require('./features/feature.create.player/lib/post.new.player.request.js'));
		});
		
		it('maps playground request', function() {
			expect(router.endPointOf({ url: '/players/any/play/world/42/level/18' })).toBe(require('./features/feature.playground/lib/display.playground.request.js'));
		});

		it('maps playground request', function() {
			expect(router.endPointOf({ url: '/players/any.name/play/world/42/level/18' })).toBe(require('./features/feature.playground/lib/display.playground.request.js'));
		});

		it('maps playground request with a complex name', function() {
			expect(router.endPointOf({ url: '/players/any@name-with.dash.and.dot/play/world/42/level/18' })).toBe(require('./features/feature.playground/lib/display.playground.request.js'));
		});
		
		it('maps display settings request', function() {
			expect(router.endPointOf({ url: '/players/any/settings' })).toBe(require('./features/feature.settings/lib/display.settings.request.js'));
		});

		it('maps post settings request', function() {
			expect(router.endPointOf({ url: '/save-settings' })).toBe(require('./features/feature.settings/lib/post.settings.request.js'));
		});

		it('maps rerun request', function() {
			expect(router.endPointOf({ url: '/players/any/rerun/world/42' })).toBe(require('./features/feature.rerun/lib/display.rerun.request.js'));
		});

		it('maps search by tag request', function() {
			expect(router.endPointOf({ url: '/players/search/any' })).toBe(require('./features/feature.search/lib/search.request.js'));
		});

		it('maps restart world request', function() {
			expect(router.endPointOf({ url: '/players/any/restart/world/42' })).toBe(require('./features/feature.restart.world/lib/restart.world.request.js'));
		});

		it('maps community request', function() {
			expect(router.endPointOf({ url: '/community' })).toBe(require('./features/feature.community/lib/community.request.js'));
		});

		it('maps what-is-yose request', function() {
			expect(router.endPointOf({ url: '/what-is-yose' })).toBe(require('./features/feature.what.is.yose/lib/what.is.yose.request.js'));
		});

		it('maps news request', function() {
			expect(router.endPointOf({ url: '/news' })).toBe(require('./features/feature.news/lib/news.request.js'));
		});
        
        it('maps data of player request', function() {
            expect(router.endPointOf({ url: '/players/any/data' })).toBe(require('./features/feature.data.of.player/lib/data.of.player.request.js'));
        });

        it('maps badge of player request', function() {
            expect(router.endPointOf({ url: '/players/any/badge.svg' })).toBe(require('./features/feature.badge.of.player/lib/badge.of.player.request.js'));
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
		});
	});
	
});