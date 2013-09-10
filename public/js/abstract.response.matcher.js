var $ = require('jquery');

var expectedContentType = 'application/json';

expectedAnswer = function(url, matcher) {
	return { 
		'content-type': expectedContentType, 
		body: matcher.expectedContent(url) 
	};
};

hasExpectedContentType = function(response) {
	return response.headers['content-type'] == expectedContentType;
};

hasExpectedContent = function(request, content, matcher) {
	return content == JSON.stringify(matcher.expectedContent(request));
};

abstractMatcher = function(request, remoteResponse, content, matcher) {
    if (remoteResponse == undefined) {
        return {
            code: 404,
            expected: expectedAnswer(request, matcher),
        };
    }
    try {
        var parsedContent = $.parseJSON(content);
    }
    catch(e) {
        var parsedContent = content;
    }
    var status = {
        code: hasExpectedContentType(remoteResponse) && hasExpectedContent(request, content, matcher) ? 200 : 501,
        expected : expectedAnswer(request, matcher),
        got: { 'content-type': remoteResponse.headers['content-type'], body: parsedContent }
    };
    return status;
};

module.exports = abstractMatcher;