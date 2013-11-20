var Browser = require('zombie');
var array = require('../../../public/js/utils/array.utils');

module.exports = {
    
    candidates: [
        {
            grid: [
                ['bomb' , 'empty', 'empty'],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'bomb' ]
            ],
            cellId: '#cell-3x1',
            expectedSafeCells: [ '#cell-2x1', '#cell-2x2', '#cell-3x1', '#cell-3x2' ],
            expectedContent: [
                ['' , '', '' ],
                ['1', '2', '' ],
                ['' , '1', '' ]
            ]
        },
        {
            grid: [
                ['empty', 'empty', 'bomb' ],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty']
            ],
            cellId: '#cell-3x1',
            expectedSafeCells: [ '#cell-1x1', '#cell-1x2', '#cell-2x1', '#cell-2x2', '#cell-2x3', '#cell-3x1', '#cell-3x2', '#cell-3x3' ],
            expectedContent: [
                ['', '1', '' ],
                ['', '1', '1'],
                ['', '' , '' ]
            ]
        },
        {
            grid: [
                ['bomb' , 'bomb' , 'bomb' ],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty']
            ],
            cellId: '#cell-3x3',
            expectedSafeCells: [ '#cell-2x1', '#cell-2x2', '#cell-2x3', '#cell-3x1', '#cell-3x2', '#cell-3x3' ],
            expectedContent: [
                ['' , '' , '' ],
                ['2', '3', '2'],
                ['' , '' , '' ]
            ]
        },
        {
            grid: [
                ['empty', 'empty', 'bomb' ],
                ['bomb' , 'empty', 'empty'],
                ['empty', 'empty', 'empty']
            ],
            cellId: '#cell-3x3',
            expectedSafeCells: [ '#cell-2x2', '#cell-2x3', '#cell-3x2', '#cell-3x3' ],
            expectedContent: [
                ['', '' , '' ],
                ['', '2', '1'],
                ['', '1', '' ]
            ]
        }        
    ],
    
    target: function() {
        return this.candidates[this.candidateIndex()];
    },
    
	candidateIndex: function() {
        return Math.floor(Math.random() * this.candidates.length);
	},
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var target = this.target();
		var expected = "";
		var browser = new Browser();		
		browser.visit(url).
		    then(function() {
			    browser.document.grid = target.grid;
			    var result = browser.evaluate('load()');
		    }).
		    then(function() {
		        array.forEach(target.expectedSafeCells, function(cellId) {
                    var classes = browser.query(cellId).className;
                    if (classes.indexOf('safe') === -1) {
                        throw 'Error : ';
                    }
		        });
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