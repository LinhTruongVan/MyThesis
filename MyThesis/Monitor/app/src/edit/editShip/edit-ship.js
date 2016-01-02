(function () {
    'use strict';

    angular
        .module('app')
        .directive('editShip', editShip);

    function editShip() {
        var directive = {
            restrict: 'E',
            scope: {
                handleAfterSave: '&',
                ships: '=',
                user: '='
            },
            templateUrl: 'src/edit/editShip/edit-ship.html',
            controller: 'editShipCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();