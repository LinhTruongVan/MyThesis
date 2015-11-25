(function() {
    
    var host = 'http://localhost:9999/api';

    var userRoles = {
        admin: 0,
        user: 1
    };

    angular.module('app')
        .constant('host', host)
        .constant('userConst', {
            roles: userRoles
        });

})();