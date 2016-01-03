(function () {
    'use strict';

    angular
        .module('app')
        .controller('pushDownCtrl', pushDownCtrl);

    pushDownCtrl.$inject = ['pushDownSvc', '$scope'];

    function pushDownCtrl(pushDownSvc, $scope) {
        var vm = this;

        vm.close = closeMe;

        init();

        function init() {
            $scope.$on("$destroy", function () {
                pushDownSvc.close();
            });
        }

        function closeMe() {
            pushDownSvc.close();
        }

    }
})();