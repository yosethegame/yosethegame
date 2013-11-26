var renderScore = require('./utils/render.score');

var fillBannerWithGreetings = function(page, player, greetings) {
    page("#avatar").attr('src', player.avatar);
	page('#score').text(renderScore(player.score));
	page('#settings-link').attr('href', '/players/' + player.login + '/settings');
	page('#dashboard-link').attr('href', '/players/' + player.login);
	page('#greetings').text(greetings);
	
};

module.exports = fillBannerWithGreetings;