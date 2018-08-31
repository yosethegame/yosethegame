var restartworld    = require('./lib/restart.world.request');

describe('Restart world utils', function() {
   
    it('can extract login from request', function() {
        expect(restartworld.extractLogin({ url: '/players/zoupo/restart/world/1' })).toEqual('zoupo');
        expect(restartworld.extractLogin({ url: '/players/as/restart/world/1' })).toEqual('as');
    });
    
    it('can extract world number from request', function() {
        expect(restartworld.extractWorldNumber({ url: '/players/zoupo/restart/world/42' })).toEqual(42);
        expect(restartworld.extractWorldNumber({ url: '/players/zoupo/restart/world/36' })).toEqual(36);
    });
       
});