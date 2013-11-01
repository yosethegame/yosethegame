var Browser = require('zombie');
var request = require('request');
var cheerio = require('cheerio');

var expected = "a page containing a#repository-link AND a repository with a readme file containing 'YoseTheGame'";

var withError = function(message, callback) {
	callback({
		code: 501,
		expected: expected,
		got: message
	});				
};

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		request(url, function (error, response, body) {
			var page = cheerio.load(body);
			if (response === undefined) { return withError('Error: 404', callback); } 
			if (response.statusCode !== 200) { return withError('Error: ' + response.statusCode, callback); } 
			if (page('a#repository-link').length === 0) { return withError('Error: missing element a#repository-link', callback); }

			var repoUrl = page('a#repository-link').attr('href');
			request(repoUrl, function (repoError, repoResponse, repoBody) {
				var pageRepo = cheerio.load(repoBody);
				if (repoResponse === undefined) { return withError('Error: 404', callback); } 
				if (repoResponse.statusCode !== 200) { return withError('Error: ' + repoResponse.statusCode,callback); } 
				if (pageRepo('#readme').length === 0) { return withError('Error: missing element #readme', callback); }
				if (pageRepo('#readme').html().indexOf('YoseTheGame') == -1) { return withError("missing reference to 'YoseTheGame' in element #readme", callback); }

				callback({
					code: 200,
					expected: expected,
					got: expected,
				});
			});
		});	
	}
};