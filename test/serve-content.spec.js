var request = require('request');
var fs = require('fs');
var servecontent = require('../public/js/serve-content.js');

describe("Serve Content callback", function() {

	var server;
	var folder = 'test/data';
	
	beforeEach(function() {	
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);			
		server = require('http').createServer(servecontent(folder)).listen(5000, 'localhost');		
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
        fs.writeFileSync(folder + '/a-missing-file', 'anything');
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
	
	it("serves a css with text/css content-type", function(done) {
	    fs.writeFileSync(folder + '/a-file.css', 'content');

		request("http://localhost:5000/a-file.css", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('text/css');
			done();
		});
	});
	
	it("serves a js with text/script content-type", function(done) {
	    fs.writeFileSync(folder + '/a-file.js', 'content');

		request("http://localhost:5000/a-file.js", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('application/javascript');
			done();
		});
	});
	
	it("serves a jpeg with image/jpeg content-type", function(done) {
	    fs.writeFileSync(folder + '/a-file.jpeg', 'content');

		request("http://localhost:5000/a-file.jpeg", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('image/jpeg');
			done();
		});
	});

	it("serves a png with image/png content-type", function(done) {
	    fs.writeFileSync(folder + '/a-file.png', 'content');

		request("http://localhost:5000/a-file.png", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('image/png');
			done();
		});
	});

	it("serves a html with text/html content-type", function(done) {
	    fs.writeFileSync(folder + '/a-file.html', 'content');

		request("http://localhost:5000/a-file.html", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('text/html');
			done();
		});
	});

	it("serves other files with text/plain content-type", function(done) {
	    fs.writeFileSync(folder + '/a-file', 'content');

		request("http://localhost:5000/a-file", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('text/plain');
			done();
		});
	});
});

