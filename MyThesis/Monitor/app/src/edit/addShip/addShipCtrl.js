(function () {
    'use strict';

    angular
        .module('app')
        .controller('addShipCtrl', addShipCtrl);

    addShipCtrl.$inject = ['$scope', 'pushDownSvc', 'settingConst', 'editDataSvc', 'spinnerUtilSvc'];

    function addShipCtrl($scope, pushDownSvc, settingConst, editDataSvc, spinnerUtilSvc) {
        var vm = this;

        vm.shipTypes = [
            settingConst.shipTypes.fishingShip
        ];
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.shipViewModel = {};
        vm.shipLocation = {};
        vm.user = $scope.user;

        vm.close = closeMe;
        vm.addShip = addShip;
        vm.handleAfterSave = $scope.handleAfterSave;

        function closeMe() {
            pushDownSvc.close();
        }

        function addShip() {
            if (!validate()) return;

            vm.shipViewModel.SailedAt = vm.shipLocation.CreatedAt = new Date();
            vm.shipViewModel.UserId = vm.user.Id;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            editDataSvc.addShip({ Ship: vm.shipViewModel, ShipLocation: vm.shipLocation }).then(function (response) {
                vm.handleAfterSave({ shipFromApi: response.data.Ship });
                closeMe();

                toastr.success('Thêm tàu thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Thêm tàu không thành công');
            });
        }

        function validate() {
            if (vm.shipViewModel.ShipType === null || vm.shipViewModel.ShipType === undefined) {
                toastr.error('Chưa nhập loại tàu');
                return false;
            }
            if (!vm.shipViewModel.Speed) {
                toastr.error('Chưa nhập vận tốc tàu');
                return false;
            }
            if (vm.shipViewModel.Speed<=0) {
                toastr.error('Vận tốc tàu không hợp lệ');
                return false;
            }
            if (!vm.shipViewModel.Weight) {
                toastr.error('Chưa nhập trọng tải tàu');
                return false;
            }
            if (vm.shipViewModel.Weight<=0) {
                toastr.error('Trọng tải tàu không hợp lệ');
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

            if (!vm.shipLocation.Latitude) {
                toastr.error('Chưa nhập vĩ độ vị trí tàu xuất phát');
                return false;
            }

            if (!vm.shipLocation.Longitude) {
                toastr.error('Chưa nhập kinh độ vị trí tàu xuất phát');
                return false;
            }

            return true;
        }

    }
})();