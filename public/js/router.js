var servecontent = require('./serve-content.js');
var dashboard	 = require('./dashboard.js');
var success		 = require('./success.js');

String.prototype.startsWith = function (prefix) {
	return this.indexOf(prefix) == 0;
}

module.exports = {
	
    routes: [
         {
         	prefix: '/players/',
         	target: dashboard
         },
         {
         	prefix: '/try-all-up-to',
         	target: require('./try-all-up-to')
         },
         {
         	prefix: '',
         	target: servecontent('public')
         }
	],
    
	endPointOf: function(request) {
    	for (i=0; i<this.routes.length; i++) {
        	if (request.url.startsWith(this.routes[i].prefix)) {
            	return this.routes[i].target;
	        }
	    }
	}
};

