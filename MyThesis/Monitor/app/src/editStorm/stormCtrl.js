(function () {
    'use strict';

    angular
        .module('app')
        .controller('stormCtrl', stormCtrl);

    stormCtrl.$inject = ['userSvc', '$location', 'spinnerUtilSvc', 'stormDataSvc'];

    function stormCtrl(userSvc, $location, spinnerUtilSvc, stormDataSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.logout = logout;
        vm.updateStorm = updateStorm;
        vm.deleteStorm = deleteStorm;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();


            if (vm.currentUser.Id !== 1) {
                toastr.error('Chỉ admin mới có quyền truy cập');
                $location.path('/home');
            }
            setupStorms();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

        function setupStorms() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);

            stormDataSvc.getStorms().then(function (response) {
                vm.storms = response.data;

                toastr.success('Tải dữ liệu thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function() {
                toastr.error('Tải dữ liệu không thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            });
        }

        function updateStorm() {
            if (!valiateStorm(vm.selectedStorm)) return;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            stormDataSvc.updateStorm(vm.selectedStorm).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Cập nhật thông tin bão thành công');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Cập nhật thông tin bão không thành công');
            });
        }

        function deleteStorm() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            stormDataSvc.deleteStorm(vm.selectedStorm.Id).then(function () {

                for (var i = 0; i < vm.storms.length; i++) {
                    var tempStorm = vm.storms[i];
                    if (tempStorm.Id === vm.selectedStorm.Id) {
                        vm.storms.splice(i, 1);
                        break;
                    }
                }

                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Xóa thông tin bão thành công');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Xóa thông tin bão không thành công');
            });
        }

        function valiateStorm() {
            if (!vm.selectedStorm.Name) {
                toastr.error('Chưa nhập tên bão');
                return false;
            }
            if (!vm.selectedStorm.Latitude) {
                toastr.error('Chưa nhập vĩ độ của tâm bão');
                return false;
            }
            if (!vm.selectedStorm.Longitude) {
                toastr.error('Chưa nhập kinh độ của tâm bão');
                return false;
            }
            if (!vm.selectedStorm.Radius) {
                toastr.error('Chưa nhập bán kính của bão');
                return false;
            }

            return true;
        }

    }
})();