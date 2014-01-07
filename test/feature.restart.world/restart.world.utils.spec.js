var restartworld    = require('../../public/feature.restart.world/restart.world.request');

describe('Restart world utils', function() {
   
    it('can extract login from request', function() {
        expect(restartworld.extractLogin({ url: '/players/bilou/restart/world/1' })).toEqual('bilou');
        expect(restartworld.extractLogin({ url: '/players/as/restart/world/1' })).toEqual('as');
    });
    
    it('can extract world number from request', function() {
        expect(restartworld.extractWorldNumber({ url: '/players/bilou/restart/world/42' })).toEqual(42);
        expect(restartworld.extractWorldNumber({ url: '/players/bilou/restart/world/36' })).toEqual(36);
    });
       
});