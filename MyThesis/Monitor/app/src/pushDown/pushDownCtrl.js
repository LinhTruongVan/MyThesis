(function () {
    'use strict';

    angular
        .module('app')
        .controller('pushDownCtrl', pushDownCtrl);

    pushDownCtrl.$inject = ['pushDownSvc'];

    function pushDownCtrl(pushDownSvc) {
        var vm = this;

        vm.close = closeMe;

        function closeMe() {
            pushDownSvc.close();
        }

    }
})();