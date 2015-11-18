(function () {
    'use strict';

    angular
        .module('app')
        .controller('simulatorSettingDialogCtrl', simulatorSettingDialogCtrl);

    simulatorSettingDialogCtrl.$inject = ['$scope'];

    function simulatorSettingDialogCtrl($scope) {
        $scope.timeout = 1;

        $scope.closeDialog = closeDialog;

        function closeDialog() {
            $scope.$dismiss('cancel');
        }

    }
})();