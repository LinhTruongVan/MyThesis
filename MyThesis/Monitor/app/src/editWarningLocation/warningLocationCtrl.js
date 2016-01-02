(function () {
    'use strict';

    angular
        .module('app')
        .controller('warningLocationCtrl', warningLocationCtrl);

    warningLocationCtrl.$inject = ['userSvc', '$location', 'spinnerUtilSvc'];

    function warningLocationCtrl(userSvc, $location, spinnerUtilSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.logout = logout;

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