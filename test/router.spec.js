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
			expect(router.endPointOf({ url: '/try-all-up-to' })).toBe(require('../public/js/try-all-up-to'));
		});
		
		it('maps start-over request', function() {
			expect(router.endPointOf({ url: '/start-over' })).toBe(require('../public/js/start-over'));
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
					prefix: '', 
					target: function(request, response) { 
						called = true; 
						response.end();
					}
				} 
			];

			require('request')("http://localhost:5000", function(error, response, body) {
				expect(called).toBe(true);
				done();
			});
		})
	});
	
});