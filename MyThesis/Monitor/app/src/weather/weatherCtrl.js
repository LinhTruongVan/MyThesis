(function () {
    'use strict';

    angular
        .module('app')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$scope', 'userSvc', '$location'];

    function weatherCtrl($scope, userSvc, $location) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();

        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

    }
})();