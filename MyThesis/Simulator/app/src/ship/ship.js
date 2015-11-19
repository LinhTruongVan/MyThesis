(function () {
    'use strict';

    angular
        .module('app')
        .directive('ship', ship);

    function ship() {
        var directive = {
            restrict: 'E',
            scope: {
                shipInfo: '=',
                shipIndex: '=',
                overlay: '=',
                settingTimeout: '='
            },
            templateUrl: 'src/ship/ship.html',
            controller: 'shipCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();