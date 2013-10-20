var Browser = require('zombie');
var request = require('request');
var cheerio = require('cheerio');

var expected = "a page containing a#repository-link AND a repository with a readme file containing 'YoseTheGame'";

var exitWithError = function(message, callback) {
	callback({
		code: 501,
		expected: expected,
		got: message
	});				
};

module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		request(url, function (error, response, body) {
			if (error || response.statusCode != 200) {
				return exitWithError(error.toString(), callback);
			} 
			else {
				var page = cheerio.load(body);
				if (page('a#repository-link').length == 0) {
					return exitWithError('Error: missing element a#repository-link', callback);
				}
				else {
					var repoUrl = page('a#repository-link').attr('href');
					request(repoUrl, function (repoError, repoResponse, repoBody) {
						if (repoError || repoResponse.statusCode != 200) {
							return exitWithError(repoError.toString(),callback);
						} 
						else {
							var pageRepo = cheerio.load(repoBody);
							if (pageRepo('#readme').length == 0) {
								return exitWithError('Error: missing element #readme', callback);
							}
							if (pageRepo('#readme').html().indexOf('YoseTheGame') == -1) {
								return exitWithError("missing reference to 'YoseTheGame' in element #readme", callback);
							}
							callback({
								code: 200,
								expected: expected,
								got: expected,
							});
						}
					});
				}
			}
		});	
	}
};