var fs = require('fs');

var index = function(request, response, database) {
	var html = fs.readFileSync('./app/features/feature.welcome/lib/index.html').toString();
	var menu = fs.readFileSync('./app/features/feature.welcome/lib/menu.html').toString();
	html = html.replace('Placeholder for the menu', menu);
    response.write(html);
    response.end();		

};

module.exports = index;
