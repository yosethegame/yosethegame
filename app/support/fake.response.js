var response = {
	write: function(content) { this.html = content; },
	end: function() {}
};

module.exports = response;