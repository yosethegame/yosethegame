module.exports = {
	isANew: function(player) {
		return player.portfolio == undefined || player.portfolio.length == 0;
	}
}