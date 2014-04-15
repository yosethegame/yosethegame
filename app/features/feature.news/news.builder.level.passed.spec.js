var builder = require('./lib/news.builder');
    
describe('Level passed news', function() {
    
    var news;
    
    beforeEach(function() {
        news = builder.playerPassedLevel(
            1, 
            { avatar: 'this-avatar', portfolio: [ { server: 'this-server' }] },
            { worlds: [ { levels: [ { id: 1, title: 'this-title' } ] } ] }
            );
    });
    
    it('displays the avatar of the player', function() {
        expect(news.image).toEqual('this-avatar');
    });

    it('notifies the passed level', function() {
        expect(news.text).toEqual('passed level "this-title"');
    });
    
    it('links to the server of the player', function() {
        expect(news.url).toEqual('this-server');
    });

});