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
            validateCurrentUser: validateCurrentUser,
            isUserExist: isUserExist
        };

        function getCurrentUser() {
            var currentUser = JSON.parse(sessionStorage.getItem('user'));

            return currentUser;
        }

        function setCurrentUser(currentUser) {
            sessionStorage.setItem('user', JSON.stringify(currentUser));
        }

        function getCurrentUserRole() {
            return user.UserRole;
        }

        function validateCurrentUser() {
            var currentUser = JSON.parse(sessionStorage.getItem('user'));
            if (!currentUser || !currentUser.Id) {
                $location.path('/login');
                return false;
            };
            return true;
        }

        function isUserExist() {
            var currentUser = JSON.parse(sessionStorage.getItem('user'));
            if (!currentUser || !currentUser.Id) {
                return false;
            };
            return true;
        }

    }
})();