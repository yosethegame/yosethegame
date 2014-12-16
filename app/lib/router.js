var servecontent = require('./serve-content.js');

module.exports = {
	
    routes: [
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/badge\.png$/,
            target: require('../features/feature.badge.of.player/lib/badge.png.of.player.request.js')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/badge\.svg$/,
            target: require('../features/feature.badge.of.player/lib/badge.svg.of.player.request.js')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/data$/,
            target: require('../features/feature.data.of.player/lib/data.of.player.request.js')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+$/,
            target: require('../features/feature.dashboard/lib/display.dashboard.js')
        },
        {
            pattern: /^\/try/,
            target: require('../features/feature.try/lib/try.request')
        },
        {
            pattern: /^\/restart-game/,
            target: require('../features/feature.restart.game/lib/restart.game')
        },
        {
            pattern: /^\/create-new-player$/,
            target: require('../features/feature.create.player/lib/create.player.request')
        },
        {
            pattern: /^\/create-player$/,
            target: require('../features/feature.create.player/lib/post.new.player.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/play\/world\/[0-9]+\/level\/[0-9]+$/,
            target: require('../features/feature.playground/lib/display.playground.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/display\/world\/[0-9]+\/level\/[0-9]+$/,
            target: require('../features/feature.display.level/lib/display.level.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/settings$/,
            target: require('../features/feature.settings/lib/display.settings.request')
        },
        {
            pattern: /^\/save-settings$/,
            target: require('../features/feature.settings/lib/post.settings.request')
        },        
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/rerun\/world\/[0-9]+$/,
            target: require('../features/feature.rerun/lib/display.rerun.request')
        },
        {
            pattern: /^\/players\/search\/(.*)+$/,
            target: require('../features/feature.search/lib/search.request')
        },
        {
            pattern: /^\/players\/[A-z|\.|\-|@|0-9]+\/restart\/world\/[0-9]+$/,
            target: require('../features/feature.restart.world/lib/restart.world.request')
        },
        {
            pattern: /^\/community$/,
            target: require('../features/feature.community/lib/community.request')
        },
        {
            pattern: /^\/what-is-yose$/,
            target: require('../features/feature.what.is.yose/lib/what.is.yose.request')
        },
        {
            pattern: /^\/news$/,
            target: require('../features/feature.news/lib/news.request')
        }
    ],
    
	endPointOf: function(request) {
        for (i=0; i<this.routes.length; i++) {
			if (this.routes[i].pattern.test(request.url)) {
                return this.routes[i].target;
            }
        }
		if (request.url == '/') {
			return require('../features/feature.welcome/lib/home.page');
		}
		return servecontent('app');
	}
};

