(function () {
    'use strict';

    angular
        .module('app')
        .directive('editStorm', editStorm);

    function editStorm() {
        var directive = {
            restrict: 'E',
            scope: {
                handleAfterSave: '&',
                storms: '='
            },
            templateUrl: 'src/editStorm/editStorm/edit-storm.html',
            controller: 'editStormCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();