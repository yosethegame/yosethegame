var request = require('request');
var fs = require('fs');
var serving = require('../public/js/serving');

describe("Serving callback", function() {

	var server;
	var folder = 'test/data';
	
	beforeEach(function() {	
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);			
		server = require('http').createServer(serving(folder)).listen(5000, 'localhost');		
	});
	afterEach(function() {
		server.close();
	});
	
	it("serves the files from the given folder", function(done) {
		var content = 'what a wonderfull world';
		fs.writeFileSync(folder + '/a-file', content);
		
		request("http://localhost:5000/a-file", function(error, response, body) {
			expect(body).toEqual(content);
			done();
		});
	});
	
	it("serves index.html file by default", function(done) {
		var content = 'content of index.html';
		fs.writeFileSync(folder + '/index.html', content);
		
		request("http://localhost:5000", function(error, response, body) {
			expect(body).toEqual(content);
			done();
		});
	});
	
	it("returns 404 when file does not exist", function(done) {
		fs.unlink(folder + '/a-missing-file');
		
		request("http://localhost:5000/a-missing-file", function(error, response, body) {
			expect(response.statusCode).toEqual(404);
			done();
		});
	});
	
	it("returns 200 when file does exist", function(done) {
		fs.writeFileSync(folder + '/a-file', 'content');
		
		request("http://localhost:5000/a-file", function(error, response, body) {
			expect(response.statusCode).toEqual(200);
			done();
		});
	});
});

