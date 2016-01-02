(function () {
    'use strict';

    angular
        .module('app')
        .directive('addStorm', addStorm);

    function addStorm() {
        var directive = {
            restrict: 'E',
            scope: {
                handleAfterSave: '&'
            },
            templateUrl: 'src/editStorm/addStorm/add-storm.html',
            controller: 'addStormCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();