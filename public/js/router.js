var servecontent = require('./serve-content.js');

String.prototype.startsWith = function (prefix) {
	return this.indexOf(prefix) == 0;
}

module.exports = {
	
    routes: [
    	{
        	prefix: '/players/',
        	target: require('./dashboard.js')
        },
        {
        	prefix: '/try-all-up-to',
        	target: require('./try-all-up-to')
        },
		{
			prefix: '/restart-game',
			target: require('../feature.restart.game/restart.game')
		},
		{
			prefix: '/create-new-player',
			target: require('../feature.create.player/create.player.request')
		},
		{
			prefix: '/create-player',
			target: require('../feature.create.player/post.new.player.request')
		}
	],
    
	endPointOf: function(request) {
    	for (i=0; i<this.routes.length; i++) {
        	if (request.url.startsWith(this.routes[i].prefix)) {
            	return this.routes[i].target;
	        }
	    }
		if (request.url == '/') {
			return require('./home.page');
		}
		return servecontent('public');
	}
};

