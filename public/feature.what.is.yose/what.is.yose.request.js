var fs = require('fs');

feature = function(request, response, database) {
    var html = fs.readFileSync('./public/feature.what.is.yose/what.is.yose.html').toString();
    response.write(html);
    response.end();
};

module.exports = feature;