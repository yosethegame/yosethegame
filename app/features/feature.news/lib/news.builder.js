var array = require('../../../utils/lib/array.utils');

function news() {
    
}

news.playerPassedLevel = function(id, player, database) {
    var title = '';
    array.forEach(database.worlds, function(world) {
        array.forEach(world.levels, function(level) {
            if(level.id == id) {
                title = level.title;
            }
        });
    });
    return { text: 'passed level "' + title + '"', image: player.avatar, url: player.portfolio[0].server };    
};

module.exports = news;