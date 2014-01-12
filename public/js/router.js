var servecontent = require('./serve-content.js');

module.exports = {
	
    routes: [
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+$/,
            target: require('../feature.dashboard/display.dashboard.js')
        },
        {
            pattern: /^\/try/,
            target: require('../feature.try/try.request')
        },
        {
            pattern: /^\/restart-game/,
            target: require('../feature.restart.game/restart.game')
        },
        {
            pattern: /^\/create-new-player$/,
            target: require('../feature.create.player/create.player.request')
        },
        {
            pattern: /^\/create-player$/,
            target: require('../feature.create.player/post.new.player.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/play\/world\/[0-9]+$/,
            target: require('../feature.playground/display.playground.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/settings$/,
            target: require('../feature.settings/display.settings.request')
        },
        {
            pattern: /^\/save-settings$/,
            target: require('../feature.settings/post.settings.request')
        },        
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/rerun\/world\/[0-9]+$/,
            target: require('../feature.rerun/display.rerun.request')
        },
        {
            pattern: /^\/players\/search\/(.*)+$/,
            target: require('../feature.search/search.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/restart\/world\/[0-9]+$/,
            target: require('../feature.restart.world/restart.world.request')
        },
        {
            pattern: /^\/what-is-yose$/,
            target: require('../feature.what.is.yose/what.is.yose.request')
        },        
    ],
    
	endPointOf: function(request) {
        for (i=0; i<this.routes.length; i++) {
			if (this.routes[i].pattern.test(request.url)) {
                return this.routes[i].target;
            }
        }
		if (request.url == '/') {
			return require('./home.page');
		}
		return servecontent('public');
	}
};

