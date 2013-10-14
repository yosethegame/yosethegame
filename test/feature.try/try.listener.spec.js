var $ 			= require('jquery');
var TryListener = require('../../public/feature.try/try.listener');

describe("TryListener: ", function() {

	var listener = new TryListener();
	
	var buildResultsWithDummyScore = function(results) {
		var resultsWithDummyScore = {
			score: 10,
			results: results
		};
		return JSON.stringify(resultsWithDummyScore);
	};
	
	beforeEach(function() {
		$('body').append(
			'<div id="results">' +
				'<div id="result_1" class="result">' +
					'<label class="challenge">challenge</label>' +
					'<label class="status">status</label>' +
					'<label class="expected">expected</label>' +
					'<label class="got">got</label>' +
				'</div>' +
			'</div>'
		);
		$('body').append('<section id="scroll-anchor"></section>');
	});
	
	afterEach(function() {
		$('#results').remove();
		$('#scroll-anchor').remove();
	});
	
	describe('Request sent:', function() {
	
		beforeEach(function() {
			$('body').append('<label id="login">eric</label>');
			$('body').append('<input id="server"/>');			
		});
		
		afterEach(function() {
			$('#login').remove();
			$('#server').remove();
		});
		
		it("sends a try request", function() {
			$('#server').val('any');
			spyOn($, 'get').andCallThrough();
			listener.try(2);

			expect($.get).toHaveBeenCalledWith('/try?login=eric&server=any&world=2');
		});
	});
	
	describe('Avatar animation', function() {

		beforeEach(function() {
			$('body').append('<img id="avatar" />');
			$('body').append('<input id="server"/>');
			$('#server').val('any');
		});
		
		afterEach(function() {
			$('#server').remove();
			$('#avatar').remove();			
		});
		
		it('starts when a try is triggered', function() {
			listener.try();
			expect($('#avatar').attr('class')).toContain('rotate');
		});
		
		it('stops when success', function() {
			$('#avatar').addClass('rotate');
			listener.displayResults('{"score":10,"results":[]}');
			expect($('#avatar').attr('class')).toNotContain('rotate');
		});
		
	});
	
	describe('Results display', function() {
		
		describe('Show / hide results', function() {

			it('hides the results when a try is triggered', function() {
				listener.try();
				expect($('#results').attr('class')).toContain('hidden');
				expect($('#results').attr('class')).toNotContain('visible');
			});

			it('shows the results when success', function() {
				$('#results').removeClass('visible').addClass('hidden');
				listener.displayResults('{"score":10,"results":[]}');
				expect($('#results').attr('class')).toNotContain('hidden');
				expect($('#results').attr('class')).toContain('visible');
			})
		});

		describe('One result display:', function() {

			beforeEach(function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 200,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));	
			});

			it('displays the first result : the challenge name', function() {
				expect($('#result_1 .challenge').text()).toEqual('this-challenge');
			});
			it('displays the first result : "success" when receiving code == 200', function() {
				expect($('#result_1 .status').text()).toEqual('success');
			});
			it('displays the first result : "fail" when receiving code != 200', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 100,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));	
				expect($('#result_1 .status').text()).toEqual('fail');
			});
			describe('The expected:', function() {
				
				it('displays an object as string', function() {
					expect($('#result_1 .expected').text()).toEqual(JSON.stringify({ question: 'any', answer: 42 }));
				});

				it('displays a string as is', function() {
					listener.displayResults(buildResultsWithDummyScore([
						{
							challenge: 'this-challenge',
							code: 200,
							expected: 'any',
							got: { flag: true }
						}
					]));	
					expect($('#result_1 .expected').text()).toEqual('any');
				});
			});
			describe('The actual', function() {
				
				it('displays an object as string', function() {
					expect($('#result_1 .got').text()).toEqual(JSON.stringify({ flag: true }));
				});
				
				it('displays a string as is', function() {
					listener.displayResults(buildResultsWithDummyScore([
						{
							challenge: 'this-challenge',
							code: 200,
							expected: { question: 'any', answer: 42 },
							got: 'any'
						}
					]));	
					expect($('#result_1 .got').text()).toEqual('any');
				});
			});

		});

		describe('Two results display:', function() {

			beforeEach(function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'one',
						code: 1,
						expected: { one: 1 },
						got: { oneone: 11 }
					},
					{
						challenge: 'second',
						code: 2,
						expected: { two: 2 },
						got: { twotwo: 2 }
					}
				]));	
			});

			describe('The challenges column', function() {

				it('displays the first result', function() {
					expect($('#result_1 .challenge').text()).toEqual('one');
				});

				it('displays the second result', function() {
					expect($('#result_2 .challenge').text()).toEqual('second');
				});

			});
			
			describe('Multiple calls only keeps the results from the last call', function() {
				
				beforeEach(function() {
					listener.displayResults(buildResultsWithDummyScore([
						{
							challenge: 'one',
							code: 200,
							expected: { question: 'any', answer: 42 },
							got: { flag: true }
						},
						{
							challenge: 'one',
							code: 200,
							expected: { question: 'any', answer: 42 },
							got: { flag: true }
						}
					]));	
					listener.displayResults(buildResultsWithDummyScore([
						{
							challenge: 'second',
							code: 200,
							expected: { question: 'any', answer: 42 },
							got: { flag: true }
						}
					]));	
				});

				it('displays the second result', function() {
					expect($('#result_1 .challenge').text()).toEqual('second');
				});

				it('updates the table to only display one line', function() {
					expect($('.result').length).toEqual(1);
				});
			});

			describe('Highligthing failures', function() {

				beforeEach(function() {
					listener.displayResults(buildResultsWithDummyScore([
						{
							challenge: 'one',
							code: 404,
							expected: { question: 'any', answer: 42 },
							got: { flag: true }
						},
						{
							challenge: 'two',
							code: 200,
							expected: { question: 'any', answer: 42 },
							got: { flag: true }
						}
					]));					
				});
				
				it('hightligth lines in errors', function() {
					expect($('#result_1').attr('class')).toContain('danger');
					expect($('#result_1').attr('class')).toNotContain('success');
				});
				
				it('hightligth lines in success', function() {
					expect($('#result_2').attr('class')).toContain('success');
					expect($('#result_2').attr('class')).toNotContain('danger');
				});
				
			});

		});

		describe('Invitation to continue:', function() {

			beforeEach(function() {
				$('body').append('<label id="continue" class="hidden">continue</label>');
			});

			afterEach(function() {
				$('#continue').remove();
			});

			it('becomes visible when success (code == 200)', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 200,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				expect($('#continue').attr('class')).toNotContain('hidden');
				expect($('#continue').attr('class')).toContain('visible');
			});

			it('remains hidden otherwise (code != 200)', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 404,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				expect($('#continue').attr('class')).toContain('hidden');
				expect($('#continue').attr('class')).toNotContain('visible');
			});

			it('remains hidden if one result is not passing', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'one',
						code: 404,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					},
					{
						challenge: 'two',
						code: 200,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				expect($('#continue').attr('class')).toContain('hidden');
				expect($('#continue').attr('class')).toNotContain('visible');
			});
			
			it('hides back when a second try is failing', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 200,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 404,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				expect($('#continue').attr('class')).toContain('hidden');
				expect($('#continue').attr('class')).toNotContain('visible');
			});
		});
		
		describe('Try button:', function() {
		
			beforeEach(function() {
				$('body').append('<button type="button" id="try">Try</button>');
			});

			afterEach(function() {
				$('#try').remove();
			});
		
			it('is disabled after success', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 200,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				expect($('#try').prop('disabled')).toEqual(true);
			});
			
			it('is enabled after failure', function() {
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 200,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				listener.displayResults(buildResultsWithDummyScore([
					{
						challenge: 'this-challenge',
						code: 404,
						expected: { question: 'any', answer: 42 },
						got: { flag: true }
					}
				]));
				expect($('#try').prop('disabled')).toEqual(false);
			});
		});
		
	});	
	
	describe('Score update', function() {
	
		beforeEach(function() {
			$('body').append('<span id="score">10</span>');
		});
		
		afterEach(function() {
			$('#score').remove();
		});
	
		it('just happens', function() {
			listener.displayResults(JSON.stringify(
				{
					score: 23,
					results: [
						{
							challenge: 'this-challenge',
							code: 200,
							expected: { question: 'any', answer: 42 },
							got: { flag: true }
						}
					]
				}));
			
			expect($('#score').text()).toEqual('000023');
		});
		
	});
});