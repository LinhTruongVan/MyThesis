(function () {
    'use strict';

    angular
        .module('app')
        .controller('createStormDialogCtrl', createStormDialogCtrl);

    createStormDialogCtrl.$inject = ['$scope', 'settingConst', 'spinnerUtilSvc', 'overlay', 'createStormDialogDataSvc'];

    function createStormDialogCtrl($scope, settingConst, spinnerUtilSvc, overlay, createStormDialogDataSvc) {

        $scope.storm = {};

        $scope.closeDialog = closeDialog;
        $scope.createStorm = createStorm;

        function closeDialog() {
            $scope.$dismiss('cancel');
        }

        function createStorm() {
            if (!validateStorm()) return;

            spinnerUtilSvc.showSpinner('spinnerSearch', overlay);
            createStormDialogDataSvc.createStorm($scope.storm).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.success('Thêm bão thành không!');
                closeDialog();
            }, function (error) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.error('Thêm bão không thành công!');
            });

        }

        function validateStorm() {
            if (!$scope.storm.Name) {
                toastr.error('Chưa nhập tên bão');
                return false;
            }
            if (!$scope.storm.Latitude) {
                toastr.error('Chưa nhập vĩ độ của tâm bão');
                return false;
            }
            if (!$scope.storm.Longitude) {
                toastr.error('Chưa nhập kinh độ của tâm bão');
                return false;
            }
            if (!$scope.storm.Radius) {
                toastr.error('Chưa nhập bán kính của bão');
                return false;
            }
        }

    }
})();