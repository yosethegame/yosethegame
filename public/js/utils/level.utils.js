var thisPlayer	= require('./player.utils');

module.exports = {

	levelIn: function(html, player, database) {
		var level = thisPlayer.currentLevel(player, database);
		return html.replace('id="level-number">42</', 'id="level-number">' + level.number  + '</')
				   .replace('id="level-name">Universe</', 'id="level-name">' + level.name  + '</');
	}
}