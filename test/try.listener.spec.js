var $ = require('jquery');
var TryListener = require('../public/js/try.listener');

describe("TryListener: ", function() {

	var listener = new TryListener();
	
	describe('Request sent:', function() {
	
		beforeEach(function() {
			$('body').append('<label id="login">eric</label>');
			$('body').append('<input id="server"/>');			
		});
		
		afterEach(function() {
			$('#login').remove();
			$('#server').remove();
		});
		
		it("send a get request to the chosen server", function() {
			$('#server').val('any');
			spyOn($, 'get').andCallThrough();
			listener.try('thisChallenge');

			expect($.get).toHaveBeenCalledWith('/try-all-up-to?challenge=thisChallenge&login=eric&server=any');
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
			listener.displayResults('[{}]');
			expect($('#avatar').attr('class')).toNotContain('rotate');
		});
		
	});
	
	describe('Show / hide results', function() {
		
		beforeEach(function() {
			$('body').append('<div id="results" class="visible"/>');
		});

		afterEach(function() {
			$('#results').remove();			
		});

		it('hides the results when a try is triggered', function() {
			listener.try();
			expect($('#results').attr('class')).toContain('hidden');
			expect($('#results').attr('class')).toNotContain('visible');
		});
		
		it('shows the results when success', function() {
			$('#results').removeClass('visible').addClass('hidden');
			listener.displayResults('[{}]');
			expect($('#results').attr('class')).toNotContain('hidden');
			expect($('#results').attr('class')).toContain('visible');
		})
	});
		
	describe('One result display', function() {
	
		beforeEach(function() {
			$('body').append(
				'<div id="result_1">' +
					'<label class="challenge">challenge</label>' +
					'<label class="status">status</label>' +
					'<label class="expected">expected</label>' +
					'<label class="got">got</label>' +
				'</div>'
				);
			listener.displayResults(JSON.stringify([
				{
					challenge: 'this-challenge',
					code: 200,
					expected: { question: 'any', answer: 42 },
					got: { flag: true }
				}
			]));	
		});
		
		afterEach(function() {
			$('#result_1').remove();
		});
		
		it('displays the first result : the challenge name', function() {
			expect($('#result_1 .challenge').text()).toEqual('this-challenge');
		});
		it('displays the first result : the status', function() {
			expect($('#result_1 .status').text()).toEqual('200');
		});
		it('displays the first result : the expected', function() {
			expect($('#result_1 .expected').text()).toEqual(JSON.stringify({ question: 'any', answer: 42 }));
		});
		it('displays the first result : the actual', function() {
			expect($('#result_1 .got').text()).toEqual(JSON.stringify({ flag: true }));
		});
	
	});
	
	describe('Invitation to continue', function() {
		
		beforeEach(function() {
			$('body').append('<label id="continue" class=hidden>continue</label>');
		});
		
		afterEach(function() {
			$('#continue').remove();
		});
		
		it('becomes visible when success', function() {
			listener.displayResults(JSON.stringify([
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
		
		it('remains hidden otherwise', function() {
			listener.displayResults(JSON.stringify([
				{
					challenge: 'this-challenge',
					code: 404,
					expected: { question: 'any', answer: 42 },
					got: { flag: true }
				}
			]));
			expect($('#continue').attr('class')).toContain('hidden');
			expect($('#continue').attr('class')).toNotContain('visible');
		})
	});
	
});