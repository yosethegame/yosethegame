var PSql = require('../app/lib/psql.database');
var dropAndCreateTableNews = require('./utils/database.drop.and.create.table.news');

describe('News creation:', function() {
        
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
    
    it('sets date to now', function(done) {
        database.addNews({ title: 'any' }, function() {
            database.getNews(function(news) {
                expect(new Date().getTime() - Date.parse(news[0].date)).toBeLessThan(1000);
                done();
            });
        });
    });
});