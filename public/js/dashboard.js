var fs = require('fs');

Dashboard = function() {}

Dashboard.prototype.display = function(request, response) {
	response.write(this.html());
	response.end();
}

Dashboard.prototype.html = function() {
	return fs.readFileSync('./public/dashboard.html').toString();
}

Dashboard.prototype.useRepository = function(repository) {
	
}

module.exports = new Dashboard();