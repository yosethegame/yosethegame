var fs = require('fs');

var index = function(request, response, database) {
	var html = fs.readFileSync('./app/features/feature.welcome/lib/index.html').toString();
    response.write(html);
    response.end();		

};

module.exports = index;
