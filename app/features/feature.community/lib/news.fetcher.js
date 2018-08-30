var selfFetcher;

NewsFetcher = function($) {
    selfFetcher = this;
    this.page = $;
}

NewsFetcher.prototype.useRenderer = function(renderer) {
    this.renderer = renderer;
};

NewsFetcher.prototype.getNews = function() {
    this.page.get('/news').done(this.received);    
};

NewsFetcher.prototype.received = function(news) {
    selfFetcher.renderer.display(JSON.parse(news));
};
