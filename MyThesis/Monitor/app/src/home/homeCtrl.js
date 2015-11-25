(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['userSvc'];

    function homeCtrl(userSvc) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        init();

        function init() {
            userSvc.validateCurrentUser();
        }

    }

})();