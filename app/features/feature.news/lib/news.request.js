var newsEndpoint = function(request, response, database) {

    database.getNews(function(news) {
        response.write(JSON.stringify(news));
        response.end();
    });	
};

module.exports = newsEndpoint;