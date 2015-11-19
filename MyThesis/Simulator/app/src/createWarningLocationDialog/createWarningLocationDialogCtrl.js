(function () {
    'use strict';

    angular
        .module('app')
        .controller('createWarningLocationDialogCtrl', createWarningLocationDialogCtrl);

    createWarningLocationDialogCtrl.$inject = ['$scope', 'settingConst', 'spinnerUtilSvc', 'overlay', 'createWarningLocationDialogSvc',
        'createWarningLocationDialogDataSvc'];

    function createWarningLocationDialogCtrl($scope, settingConst, spinnerUtilSvc, overlay, createWarningLocationDialogSvc,
        createWarningLocationDialogDataSvc) {

        $scope.warningLocation = {
            $type: 'WarningLocation'
        };

        $scope.warningLocationTypes = createWarningLocationDialogSvc.getWarningLocationTypes();

        $scope.closeDialog = closeDialog;
        $scope.createWarningLocation = createWarningLocation;

        function closeDialog() {
            $scope.$dismiss('cancel');
        }

        function createWarningLocation() {
            if (!createWarningLocationDialogSvc.validateWarningLocation($scope.warningLocation)) return;
            $scope.warningLocation.CreatedAt = new Date();

            spinnerUtilSvc.showSpinner('spinnerSearch', overlay);
            createWarningLocationDialogDataSvc.createWarningLocation($scope.warningLocation).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.success('Thêm cảnh báo thành không!');
                closeDialog();
            }, function (error) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.error('Thêm cảnh báo không thành công!');
            });

        }

    }
})();