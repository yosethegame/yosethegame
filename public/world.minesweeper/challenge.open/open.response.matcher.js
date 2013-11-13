var Browser = require('zombie');

module.exports = {
    
	data: [
		['empty', 'bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty', 'empty'],
		['empty', 'bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty'],
		['bomb', 'empty', 'empty', 'empty', 'bomb', 'empty', 'empty', 'bomb'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ],

	candidates: [
        { 
            row: 1, column: 4, 
            zeros: [ 
                {row:1, column:4}, {row:1, column:5}, {row:1, column:6}, {row:1, column:7}, {row:1, column:8},
                {row:2, column:7}, {row:2, column:8}, 
                {row:3, column:7}, {row:3, column:8},
                {row:4, column:8} 
            ],
            borders: [
                {row:1, column:3, bombAround: 1},
                {row:2, column:3, bombAround: 1},
                {row:2, column:4, bombAround: 1},
                {row:2, column:5, bombAround: 1},
                {row:2, column:6, bombAround: 1},
                {row:3, column:6, bombAround: 1},
                {row:4, column:6, bombAround: 2},
                {row:4, column:7, bombAround: 1},
                {row:5, column:7, bombAround: 2},
                {row:5, column:8, bombAround: 1},
            ]
        }, 
        { 
            row: 6, column: 3, 
            zeros: [ 
                {row:6, column:3},
                {row:7, column:3},
                {row:8, column:3}, {row:8, column:4}, {row:8, column:5}, {row:8, column:6}, {row:8, column:7}, {row:8, column:8}, 
            ],
            borders: [
                {row:5, column:2, bombAround: 2},
                {row:5, column:3, bombAround: 1},
                {row:5, column:4, bombAround: 1},
                {row:6, column:2, bombAround: 1},
                {row:6, column:4, bombAround: 1},
                {row:7, column:2, bombAround: 2},
                {row:7, column:4, bombAround: 1},
                {row:7, column:5, bombAround: 1},
                {row:7, column:6, bombAround: 1},
                {row:7, column:7, bombAround: 1},
                {row:7, column:8, bombAround: 1},
                {row:8, column:2, bombAround: 1},
            ]
        }, 
	],
	
	candidateIndex: function() {
        return Math.floor(Math.random() * this.candidates.length);
	},
	
    validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var expected = "";
		
		var browser = new Browser();		
		browser.visit(url).
			then(function() {
				browser.document.grid = self.data;
				var result = browser.evaluate('load()');
			}).
			then(function() {
				callback({
					code: 200,
					expected: expected,
					got: expected
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: expected,
					got: error.toString()
				});
			});
	}
	
};