(function () {
    'use strict';

    angular
        .module('app')
        .directive('addShip', addShip);

    function addShip() {
        var directive = {
            restrict: 'E',
            scope: {
                handleAfterSave: '&',
                user: '='
            },
            templateUrl: 'src/edit/addShip/add-ship.html',
            controller: 'addShipCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();