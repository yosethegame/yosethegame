describe('json parsing', function() {

   it('can parse an object from a string', function() {
       var value = '{"alive":true}';
       var response = JSON.parse(value);

       expect(response.alive).toBe(true);
   });
});
