var error404 = require('../../../common/lib/404');
var error501 = require('../../../common/lib/501');

module.exports = {
    
    basicVerifications: function(remoteResponse, callback) {
    
        if (remoteResponse === undefined) {
            callback(error404.withValues('A running http server', 'Error: 404'));
            return false;
        }

        if (remoteResponse.statusCode !== 200) {
            callback(error501.withValues('response status = 200', 'Error: 404'));
            return false;
        }

        if (remoteResponse.headers === undefined) {
            callback(error501.withValues('content-type = text/html', 'Error: content-type = undefined'));
            return false;
        }
        
        if (remoteResponse.headers['content-type'] === undefined) {
            callback(error501.withValues('content-type = text/html', 'Error: content-type = undefined'));
            return false;
        }
        
        if (remoteResponse.headers['content-type'].indexOf('text/html') ===-1 ) {
            callback(error501.withValues('content-type = text/html', 'Error: content-type = ' + remoteResponse.headers['content-type']));
            return false;
        }
        
        return true;
    }
};