(function () {
    'use strict';
    
    angular
        .module('app')
        .factory('userSvc', userSvc);

    userSvc.$inject = ['$location'];

    function userSvc($location) {

        var user = {};

        return {
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getCurrentUserRole: getCurrentUserRole,
            validateCurrentUser: validateCurrentUser
        };

        function getCurrentUser() {
            return user;
        }

        function setCurrentUser(currentUser) {
            user = currentUser;
        }

        function getCurrentUserRole() {
            return user.UserRole;
        }

        function validateCurrentUser() {
            if (!user.Id) {
                $location.path('/login');
                return false;
            };
            return true;
        }

    }
})();