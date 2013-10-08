var router = require('../public/js/router.js');

describe('Router', function() {

    describe('Prod configuration:', function() {
	
		it('has routes', function() {
			expect(router.routes.length).toBeGreaterThan(1);
		});

		it('maps dashboard request', function() {
			expect(router.endPointOf({ url: '/players/any' })).toBe(require('../public/js/dashboard'));
		});
		
		it('maps static content request', function() {
			expect(router.endPointOf({ url: '/anything-else' }).toString()).toEqual(servecontent('public').toString());
		});
		
		it('maps try-all-up-to request', function() {
			expect(router.endPointOf({ url: '/try-all-up-to' })).toBe(require('../public/feature.try/try-all-up-to'));
		});
		
		it('maps restart-game request', function() {
			expect(router.endPointOf({ url: '/restart-game' })).toBe(require('../public/feature.restart.game/restart.game'));
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
					prefix: '/gate', 
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