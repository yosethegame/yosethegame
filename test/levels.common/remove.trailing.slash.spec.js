var removeTrailingSlashOf = require('../../public/levels.common/remove.trailing.slash');

describe('Trailing slash remover', function() {
   
   it('works as expected', function() {
       expect(removeTrailingSlashOf('url/')).toEqual('url');
   });
   
   it('supports undefined param', function() {
       expect(removeTrailingSlashOf(undefined)).toEqual(undefined);
   });
      
   
});