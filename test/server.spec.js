var request = require('request');
var Server = require('../public/js/server');
var router = require('../public/js/router');

describe('Server >', function() {

	var server;

	describe('router use:', function() {
    	
        var endPointCalled = false;
    	
        beforeEach(function() {
	        endPoint = function(request, response) {
            	endPointCalled = true;
                response.end();
            };
			router.routes = [
				{ 
					prefix: '/this-path', 
					target: endPoint
				} 
			];
            server = new Server(router);
            server.start();
        });
             
    	afterEach(function() {
            server.stop();
        });

	    it('calls the endpoint found in the given router', function(done) {
            request("http://localhost:5000/this-path", function(error, response, body) {
                expect(endPointCalled).toBe(true);
                done();
            });       
    	});
        
    });

	describe('database use:', function() {
             
    	var database = {};
        var databaseReceived;
    	
        beforeEach(function() {
	        endPoint = function(request, response, database) {
                databaseReceived = database;
                response.end();
            };
			router.routes = [
				{ 
					prefix: '/this-path', 
					target: endPoint
				} 
			];
            server = new Server(router);
            server.useDatabase(database);
            server.start();
        });
             
    	afterEach(function() {
            server.stop();
        });

	    it('send the database to the endpoint', function(done) {
            request("http://localhost:5000/this-path", function(error, response, body) {
                expect(databaseReceived).toBe(database);
                done();
            });       
    	});
        
	});
});	