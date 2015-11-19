(function () {
    'use strict';

    angular
        .module('app')
        .controller('simulatorSettingDialogCtrl', simulatorSettingDialogCtrl);

    simulatorSettingDialogCtrl.$inject = ['$scope', 'simulatorSettingDialogSvc'];

    function simulatorSettingDialogCtrl($scope, simulatorSettingDialogSvc) {
        var settingTimeout = simulatorSettingDialogSvc.getSettingTimeout();

        $scope.updateLocationTimeoutSlider = {
            value: settingTimeout.updateLocation,
            options: {
                floor: 0,
                ceil: 100
            }
        };

        $scope.sendLocationTimeoutSlider = {
            value: settingTimeout.sendLocation,
            options: {
                floor: 0,
                ceil: 100
            }
        };

        $scope.closeDialog = closeDialog;

        function closeDialog() {
            $scope.$dismiss('cancel');
        }

    }
})();