var $ = $ || require('jquery');

var selfFetcher;

function NewsFetcher() {
    selfFetcher = this;
}

NewsFetcher.prototype.useRenderer = function(renderer) {
    this.renderer = renderer;
};

NewsFetcher.prototype.getNews = function() {
    $.get('/news').success(this.received);    
};

NewsFetcher.prototype.received = function(news) {
    selfFetcher.renderer.display(JSON.parse(news));
};

var module = module || {};
module.exports = NewsFetcher;