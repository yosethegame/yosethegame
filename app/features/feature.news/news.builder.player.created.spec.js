var builder = require('./lib/news.builder');
    
describe('Player created news', function() {
    
    var news;
    
    beforeEach(function() {
        news = builder.playerCreated({ avatar: 'this-avatar' });
    });
    
    it('displays the avatar of the player', function() {
        expect(news.image).toEqual('this-avatar');
    });

    it('notifies the created player', function() {
        expect(news.text).toEqual('entered the game');
    });
    
    it('does not link to the server of the player because it does not exist yet', function() {
        expect(news.url).toEqual('');
    });

});