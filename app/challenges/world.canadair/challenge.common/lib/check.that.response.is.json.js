var error501 = require('../../../common/lib/501');

var hasExpectedContentType = function(response) {
    return response.headers !== undefined &&
           response.headers['content-type'] !== undefined &&
           response.headers['content-type'].indexOf('application/json') !== -1;
};

var responseIsJson = function(remoteResponse, content, callback) {
    
    if (remoteResponse === undefined) {
        callback(error501.withValues('A Json object', 'An empty response'));
        return false;
    }
    if (remoteResponse.statusCode !== 200) {
        callback(error501.withValues('A Json object', 'Error ' + remoteResponse.statusCode));
        return false;
    }
    if (! hasExpectedContentType(remoteResponse)) {
        callback(error501.withValues('A content-type application/json in header', 'A different content-type'));
        return false;
    }
    
    try {
        JSON.parse(content);
    }
    catch (e) {
        callback(error501.withValues('A Json object', '"' + content + '"'));
        return false;
    }
    
    return true;
};

module.exports = responseIsJson;