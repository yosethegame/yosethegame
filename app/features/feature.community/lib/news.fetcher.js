var selfFetcher;

function NewsFetcher($) {
    selfFetcher = this;
    this.page = $;
}

NewsFetcher.prototype.useRenderer = function(renderer) {
    this.renderer = renderer;
};

NewsFetcher.prototype.getNews = function() {
    this.page.get('/news').success(this.received);    
};

NewsFetcher.prototype.received = function(news) {
    selfFetcher.renderer.display(JSON.parse(news));
};

var module = module || {};
module.exports = NewsFetcher;