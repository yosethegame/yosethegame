Dashboard = function() {}

Dashboard.prototype.display = function(request, response) {
	response.write('<html><body><label id="info">Unknown player</label></body></html>');
	response.end();
}

module.exports = new Dashboard();