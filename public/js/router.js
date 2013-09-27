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
			prefix: '/start-over',
			target: require('./start.over')
		},
		{
			prefix: '/restart-game',
			target: require('./restart.game')
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

