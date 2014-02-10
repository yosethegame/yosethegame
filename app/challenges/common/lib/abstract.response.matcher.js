var $		= require('jquery');
var equal	= require('deep-equal');

var expectedContentType = 'application/json';

expectedAnswer = function(url, matcher) {
	return { 
		'content-type': expectedContentType, 
		body: matcher.expectedContent(url) 
	};
};

hasExpectedContentType = function(response) {
	return response.headers['content-type'] !== undefined &&
           response.headers['content-type'].indexOf(expectedContentType) !== -1;
};

hasExpectedContent = function(request, content, matcher) {
	return equal(content, matcher.expectedContent(request));
};

computeStatus = function(request, remoteResponse, content, matcher) {
    var status;
	if (remoteResponse === undefined) {
        status = {
            code: 404,
            expected: expectedAnswer(request, matcher),
        };
    }
	else {
        var parsedContent;
        try {
            parsedContent = JSON.parse(content);
        }
        catch(e) {
            parsedContent = content;
        }
        status = {
            code: hasExpectedContentType(remoteResponse) && hasExpectedContent(request, parsedContent, matcher) ? 200 : 501,
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