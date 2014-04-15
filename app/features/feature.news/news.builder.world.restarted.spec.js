var builder = require('./lib/news.builder');
    
describe('Restarted world news', function() {
    
    var news;
    
    beforeEach(function() {
        news = builder.playerRestartedWorld(
            { name: 'Dune' }, 
            { avatar: 'this-avatar', portfolio: [ { server: 'this-server' }] });
    });
    
    it('displays the avatar of the player', function() {
        expect(news.image).toEqual('this-avatar');
    });

    it('notifies the world restart', function() {
        expect(news.text).toEqual('restarted world "Dune"');
    });
    
    it('links to the server of the player', function() {
        expect(news.url).toEqual('this-server');
    });

});