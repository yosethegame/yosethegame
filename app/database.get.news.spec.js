var PSql = require('../app/lib/psql.database');
var dropAndCreateTableNews = require('./utils/database.drop.and.create.table.news');

describe('News retrieval', function() {
        
	var url = process.env.DATABASE_URL;
	var database = new PSql(url);

    beforeEach(function(done) {
        dropAndCreateTableNews(url, function() {
            done();
        });
    });
    
    it('works', function(done) {
        database.addNews({ title: 'the awesome news' }, function() {
            database.getNews(function(news) {
                expect(news.length).toEqual(1);
                expect(news[0].title).toEqual('the awesome news');
                done();
            });
        });
    });
    
    it('returns empty array when there is no news', function(done) {
        database.getNews(function(news) {
            expect(news).toEqual([]);
            done();
        });
    });
});