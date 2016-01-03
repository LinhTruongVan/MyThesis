(function () {
    'use strict';

    angular
        .module('app')
        .controller('addWarningCtrl', addWarningCtrl);

    addWarningCtrl.$inject = ['$scope', 'pushDownSvc', 'settingConst', 'warningLocationDataSvc', 'spinnerUtilSvc', 'warningLocationConst'];

    function addWarningCtrl($scope, pushDownSvc, settingConst, warningLocationDataSvc, spinnerUtilSvc, warningLocationConst) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.warningTypes = [
           warningLocationConst.reef,
           warningLocationConst.pirateShip,
           warningLocationConst.chinaShip
        ];
        vm.warningViewModel = {};

        vm.close = closeMe;
        vm.addWarning = addWarning;
        vm.handleAfterSave = $scope.handleAfterSave;

        function closeMe() {
            pushDownSvc.close();
        }

        function addWarning() {
            if (!validate()) return;

            vm.warningViewModel.CreatedAt = new Date();

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            warningLocationDataSvc.addWarning(vm.warningViewModel).then(function (response) {
                var tempWarning = response.data;
                switch (tempWarning.WarningLocationType) {
                    case warningLocationConst.reef.value:
                        tempWarning.displayType = warningLocationConst.reef.name;
                        break;
                    case warningLocationConst.pirateShip.value:
                        tempWarning.displayType = warningLocationConst.pirateShip.name;
                        break;
                    case warningLocationConst.chinaShip.value:
                        tempWarning.displayType = warningLocationConst.chinaShip.name;
                        break;
                }
                vm.handleAfterSave({ warningFromApi: tempWarning });
                closeMe();

                toastr.success('Thêm cảnh báo thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Thêm cảnh báo không thành công');
            });
        }

        function validate() {
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