(function () {
    'use strict';

    angular
        .module('app')
        .controller('editShipCtrl', editShipCtrl);

    editShipCtrl.$inject = ['$scope', 'pushDownSvc', 'settingConst', 'editDataSvc', 'spinnerUtilSvc'];

    function editShipCtrl($scope, pushDownSvc, settingConst, editDataSvc, spinnerUtilSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.shipViewModel = {};
        vm.ships = angular.copy($scope.ships);
        vm.user = $scope.user;

        vm.close = closeMe;
        vm.editShip = editShip;
        vm.deleteShip = deleteShip;
        vm.handleAfterSave = $scope.handleAfterSave;

        function closeMe() {
            pushDownSvc.close();
        }

        function deleteShip() {
            if (!vm.shipViewModel.Id) {
                toastr.error('Chưa chọn tàu cần xóa');
                return;
            }

            for (var i = 0; i < vm.ships.length; i++) {
                if (vm.ships[i].Id === vm.shipViewModel.Id) {
                    vm.shipViewModel.shipIndex = i;
                    break;
                }
            }

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            editDataSvc.deleteShip(vm.shipViewModel.Id).then(function () {
                vm.shipViewModel.isDeleting = true;
                vm.handleAfterSave({ shipFromApi: vm.shipViewModel });
                closeMe();

                toastr.success('Xóa tàu thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Xóa tàu không thành công');
            });
        }

        function editShip() {
            if (!validate()) return;

            var shipIndex = null;
            for (var i=0; i<vm.ships.length; i++) {
                if (vm.ships[i].Id === vm.shipViewModel.Id) {
                    shipIndex = i;
                    break;
                }
            }

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            editDataSvc.updateShip(vm.user.Id, vm.shipViewModel).then(function (response) {
                vm.shipViewModel = response.data;
                vm.shipViewModel.shipIndex = shipIndex;
                vm.shipViewModel.isDeleting = false;
                vm.handleAfterSave({ shipFromApi: vm.shipViewModel });
                closeMe();

                toastr.success('Chỉnh sửa thông tin tàu thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Chỉnh sửa thông tin tàu không thành công');
            });
        }

        function validate() {
            if (!vm.shipViewModel.Id) {
                toastr.error('Chưa chọn tàu cần chỉnh sửa');
                return false;
            }
            if (!vm.shipViewModel.Caption) {
                toastr.error('Chưa nhập thông tin thuyền trưởng');
                return false;
            }
            if (!vm.shipViewModel.Sailors) {
                toastr.error('Chưa nhập số lượng thuyền viên');
                return false;
            }
            if (vm.shipViewModel.Sailors<=0) {
                toastr.error('Số lượng thuyền viên không hợp lệ');
                return false;
            }

            return true;
        }

    }
})();