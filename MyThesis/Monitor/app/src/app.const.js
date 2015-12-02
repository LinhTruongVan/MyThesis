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
        .constant('warningLocationConst', {
            reef: {
                value: 0,
                name: 'Bãi đá ngầm/bãi rạng'
            },
            pirateShip: {
                value: 1,
                name: 'Tàu/thuyền hải tặc'
            },
            chinaShip: {
                value: 2,
                name: 'Tàu/thuyền Trung Quốc'
            }
        })
        .constant('userConst', {
            roles: userRoles
        });

})();