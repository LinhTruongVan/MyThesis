(function () {
    'use strict';

    angular
        .module('app')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['userSvc', '$location', 'homeDataSvc', 'spinnerUtilSvc', 'homeSvc', 'editDataSvc'];

    function editCtrl(userSvc, $location, homeDataSvc, spinnerUtilSvc, homeSvc, editDataSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.ships = [];
        vm.selectedShip = {};

        vm.logout = logout;
        vm.updateShip = updateShip;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();

            setupAllShips();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

        function setupAllShips() {
            homeDataSvc.getAllShips(vm.currentUser).then(function (response) {
                vm.ships = response.data;
            }, function () {
            });
        }

        function updateShip() {
            if (!valiateShip(vm.selectedShip)) return;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            editDataSvc.updateShip(vm.currentUser.Id, vm.selectedShip).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Cập nhật thông tin tàu thành công');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Cập nhật thông tin tàu không thành công');
            });
        }

        function valiateShip(ship) {
            if (!ship.Caption || ship.Caption.length <=0) {
                toastr.error('Tên thuyền trưởng không hợp lệ');
                return false;
            }
            if (!ship.Sailors || ship.Sailors < 0) {
                toastr.error('Tên thuyền trưởng không hợp lệ');
                return false;
            }

            return true;
        }

    }

})();