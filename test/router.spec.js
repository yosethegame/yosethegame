var Router = require('../public/js/router.js');

describe('Router', function() {

	var router = new Router();
	
	describe('Prod configuration:', function() {
	
		var dashboard	 = require('../public/js/dashboard');
		var servecontent = require('../public/js/serve-content');
		var tryAll		 = require('../public/js/try-all-up-to');

		it('has routes', function() {
			expect(router.routes.length).toBeGreaterThan(1);
		});

		it('maps dashboard request', function() {
			expect(router.endPointOf({ url: '/players/any' })).toBe(dashboard);
		});
		
		it('maps static content request', function() {
			expect(router.endPointOf({ url: '/anything-else' }).toString()).toEqual(servecontent('public').toString());
		});
		
		it('maps try-all-up-to request', function() {
			expect(router.endPointOf({ url: '/try-all-up-to' })).toBe(tryAll);
		})
		
	});
	
	describe('Node.js compatibility:', function() {
		
		var server;
		
		beforeEach(function() {
			server = require('http').createServer(router.gate).listen(5000, 'localhost');					
		});
		
		afterEach(function() {
			server.close();
		});
		
		it('routes as expected', function(done) {
			var called = false;
			router.routes = [ 
				{ 
					prefix: '/a-specific-request', 
					target: function(request, response) { 
						called = true; 
						response.end();
					}
				} 
			];

			require('request')("http://localhost:5000/a-specific-request", function(error, response, body) {
				expect(called).toBe(true);
				done();
			});
		})
	});
	
});