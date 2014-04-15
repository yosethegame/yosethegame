var builder = require('./lib/news.builder');
    
describe('Restarted game news', function() {
    
    var news;
    
    beforeEach(function() {
        news = builder.playerRestartedGame({ avatar: 'this-avatar' });
    });
    
    it('displays the avatar of the player', function() {
        expect(news.image).toEqual('this-avatar');
    });

    it('notifies the game restart', function() {
        expect(news.text).toEqual('restarted the game');
    });
    
    it('does not link to the server of the player because it does not exist any more after restart', function() {
        expect(news.url).toEqual('');
    });

});