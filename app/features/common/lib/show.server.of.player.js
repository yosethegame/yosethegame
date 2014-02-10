var thePlayer	= require('../../../lib/player.utils');

var showServerOfPlayer = function(page, player) {
	if (thePlayer.hasServer(player)) {
		var serverOfPlayer = thePlayer.serverOf(player);
		page('#server-of-player').addClass('visible').removeClass('hidden').empty().append(serverOfPlayer);
		page('#server-of-player').attr('href', serverOfPlayer);
	}	
};

module.exports = showServerOfPlayer;