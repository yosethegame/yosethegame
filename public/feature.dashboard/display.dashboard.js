var fs 		  	= require('fs');

dashboard = function(request, response, database) {
	var html = fs.readFileSync('./public/feature.dashboard/dashboard.html').toString();

	response.write(html);
	response.end();
}

module.exports = dashboard;