(function () {
    'use strict';

    angular
        .module('app')
        .directive('editWarning', editWarning);

    function editWarning() {
        var directive = {
            restrict: 'E',
            scope: {
                handleAfterSave: '&',
                warnings: '='
            },
            templateUrl: 'src/editWarningLocation/editWarning/edit-warning.html',
            controller: 'editWarningCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();