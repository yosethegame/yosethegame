var $ = require('jquery');

abstractMatcher = function(request, remoteResponse, content, matcher) {
    if (remoteResponse == undefined) {
        return {
            code: 404,
            expected: matcher.expectedAnswer(request),
        };
    }
    try {
        var parsedContent = $.parseJSON(content);
    }
    catch(e) {
        var parsedContent = content;
    }
    var status = {
        code: matcher.hasExpectedContentType(remoteResponse) && matcher.hasExpectedContent(request, content) ? 200 : 501,
        expected : matcher.expectedAnswer(request),
        got: { 'content-type': remoteResponse.headers['content-type'], body: parsedContent }
    };
    return status;
};

module.exports = abstractMatcher;