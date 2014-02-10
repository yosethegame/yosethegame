var exitWithMessage = function(message, page, response) {
	page('#info').addClass('visible').removeClass('hidden');
	page('#info').text(message);
	page('#player').addClass('hidden').removeClass('visible');
	response.write(page.html());
	response.end();
	return;	
};

module.exports = exitWithMessage;