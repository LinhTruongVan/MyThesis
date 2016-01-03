(function () {
    'use strict';

    angular
        .module('app')
        .controller('editWarningCtrl', editWarningCtrl);

    editWarningCtrl.$inject = ['$scope', 'pushDownSvc', 'settingConst', 'warningLocationDataSvc', 'spinnerUtilSvc', 'warningLocationConst'];

    function editWarningCtrl($scope, pushDownSvc, settingConst, warningLocationDataSvc, spinnerUtilSvc, warningLocationConst) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.warningTypes = [
           warningLocationConst.reef,
           warningLocationConst.pirateShip,
           warningLocationConst.chinaShip
        ];
        vm.warningViewModel = {};
        vm.warnings = angular.copy($scope.warnings);

        vm.close = closeMe;
        vm.editWarning = editWarning;
        vm.deleteWarning = deleteWarning;
        vm.handleAfterSave = $scope.handleAfterSave;

        function closeMe() {
            pushDownSvc.close();
        }

        function deleteWarning() {
            if (!vm.warningViewModel.Id) {
                toastr.error('Chưa chọn cảnh báo cần xóa');
                return;
            }

            for (var i = 0; i < vm.warnings.length; i++) {
                if (vm.warnings[i].Id === vm.warningViewModel.Id) {
                    vm.warningViewModel.warningIndex = i;
                    break;
                }
            }

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            warningLocationDataSvc.deleteWarning(vm.warningViewModel.Id).then(function () {
                vm.warningViewModel.isDeleting = true;
                vm.handleAfterSave({ warningFromApi: vm.warningViewModel });
                closeMe();

                toastr.success('Xóa cảnh báo thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Xóa cảnh báo không thành công');
            });
        }

        function editWarning() {
            if (!validate()) return;

            for (var i = 0; i < vm.warnings.length; i++) {
                if (vm.warnings[i].Id === vm.warningViewModel.Id) {
                    vm.warningViewModel.warningIndex = i;
                    break;
                }
            }

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            warningLocationDataSvc.editWarning(vm.warningViewModel).then(function (response) {
                var tempWarning = response.data;
                tempWarning.warningIndex = vm.warningViewModel.warningIndex;
                tempWarning.isDeleting = false;

                vm.handleAfterSave({ warningFromApi: tempWarning });
                closeMe();

                toastr.success('Chỉnh sửa thông tin cảnh báo thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Chỉnh sửa thông tin cảnh báo không thành công');
            });
        }

        function validate() {
            if (!vm.warningViewModel.Id) {
                toastr.error('Chưa chọn cảnh báo cần chỉnh sửa');
                return false;
            }

            if (vm.warningViewModel.WarningLocationType === null || vm.warningViewModel.WarningLocationType === undefined) {
                toastr.error('Chưa nhập loại cảnh báo');
                return false;
            }
            if (!vm.warningViewModel.Latitude) {
                toastr.error('Chưa nhập vĩ độ cảnh báo');
                return false;
            }
            if (vm.warningViewModel.Latitude < 0) {
                toastr.error('Vĩ độ cảnh báo không hợp lệ');
                return false;
            }
            if (!vm.warningViewModel.Longitude) {
                toastr.error('Chưa nhập kinh độ cảnh báo');
                return false;
            }
            if (vm.warningViewModel.Longitude < 0) {
                toastr.error('Kinh độ cảnh báo không hợp lệ');
                return false;
            }

            return true;
        }

    }
})();