var Browser = require('zombie');

module.exports = {
    
    candidates: [
        {
            grid: [
                ['bomb' , 'empty', 'empty'],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'bomb' ]
            ],
            cellId: '#cell-3x1',
            expectedSafeCells: [
                [''    , ''    , ''],
                ['safe', 'safe', ''],
                ['safe', 'safe', '']
            ],
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
            expectedSafeCells: [
                ['safe', 'safe', ''    ],
                ['safe', 'safe', 'safe'],
                ['safe', 'safe', 'safe']
            ],
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
            expectedSafeCells: [
                [''    , ''    , ''    ],
                ['safe', 'safe', 'safe'],
                ['safe', 'safe', 'safe']
            ],
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
            expectedSafeCells: [
                ['', ''    , ''    ],
                ['', 'safe', 'safe'],
                ['', 'safe', 'safe']
            ],
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
		var expected = "";
		var browser = new Browser();		
		browser.visit(url).
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