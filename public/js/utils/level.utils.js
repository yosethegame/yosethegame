var thisPlayer	= require('./player.utils');

module.exports = {

	levelIn: function(html, level) {
		return html.replace('id="level-number">42</', 'id="level-number">' + level.number  + '</')
				   .replace('id="level-name">Universe</', 'id="level-name">' + level.name  + '</');
	}
}