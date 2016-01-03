(function () {
    'use strict';

    angular
        .module('app')
        .directive('addWarning', addWarning);

    function addWarning() {
        var directive = {
            restrict: 'E',
            scope: {
                handleAfterSave: '&'
            },
            templateUrl: 'src/editWarningLocation/addWarning/add-warning.html',
            controller: 'addWarningCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();