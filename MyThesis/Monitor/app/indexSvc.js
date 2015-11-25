(function () {
    'use strict';
    
    angular
        .module('app')
        .factory('indexSvc', indexSvc);

    indexSvc.$inject = ['userSvc', '$location'];

    function indexSvc(userSvc, $location) {

        return {
            validateCurrentUser: validateCurrentUser
        };

        function validateCurrentUser() {
            //if (!userSvc.getCurrentUser().Id) $location.path('/login');
        }

    }
})();