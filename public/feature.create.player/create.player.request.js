var fs = require('fs');

createPlayer = function(request, response, database) {
	var html = fs.readFileSync(createPlayer.formfile).toString();
	
	response.write(html);
	response.end();
};

createPlayer.formfile = './public/feature.create.player/create.player.form.html';

module.exports = createPlayer;