(function() {
    
    var host = 'http://localhost:9999/api';

    var userRoles = {
        admin: 0,
        user: 1
    };

    var shipTypes = {
        fishingShip: {
            value: 0,
            name: 'Tàu đánh cá'
        }
    };

    angular.module('app')
        .constant('host', host)
        .constant('settingConst', {
            shipTypes: shipTypes
        })
        .constant('userConst', {
            roles: userRoles
        });

})();