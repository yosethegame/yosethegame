var $ = require('jquery');

var expectedContentType = 'application/json';

expectedAnswer = function(url, matcher) {
	return { 
		'content-type': expectedContentType, 
		body: matcher.expectedContent(url) 
	};
};

hasExpectedContentType = function(response) {
	return response.headers['content-type'] != undefined 
		&& response.headers['content-type'].indexOf(expectedContentType) != -1;
};

hasExpectedContent = function(request, content, matcher) {
	return content == JSON.stringify(matcher.expectedContent(request));
};

computeStatus = function(request, remoteResponse, content, matcher) {
	if (remoteResponse == undefined) {
        var status = {
            code: 404,
            expected: expectedAnswer(request, matcher),
        };
    }
	else {
	    try {
	        var parsedContent = $.parseJSON(content);
	    }
	    catch(e) {
	        var parsedContent = content;
	    }
	    var status = {
	        code: hasExpectedContentType(remoteResponse) && hasExpectedContent(request, JSON.stringify(parsedContent), matcher) ? 200 : 501,
	        expected : expectedAnswer(request, matcher),
	        got: { 'content-type': remoteResponse.headers['content-type'], body: parsedContent }
	    };
	}
    return status;
};

abstractMatcher = function(request, remoteResponse, content, matcher, callback) {
    callback(computeStatus(request, remoteResponse, content, matcher));
};

module.exports = abstractMatcher;
module.exports.computeStatus = computeStatus;