(function () {
    'use strict';

    angular
        .module('app')
        .controller('editStormCtrl', editStormCtrl);

    editStormCtrl.$inject = ['$scope', 'pushDownSvc', 'settingConst', 'stormDataSvc', 'spinnerUtilSvc'];

    function editStormCtrl($scope, pushDownSvc, settingConst, stormDataSvc, spinnerUtilSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.stormViewModel = {};
        vm.storms = angular.copy($scope.storms);

        vm.close = closeMe;
        vm.editStorm = editStorm;
        vm.deleteStorm = deleteStorm;
        vm.handleAfterSave = $scope.handleAfterSave;

        function closeMe() {
            pushDownSvc.close();
        }

        function deleteStorm() {
            if (!vm.stormViewModel.Id) {
                toastr.error('Chưa chọn cơn bão cần xóa');
                return;
            }

            for (var i = 0; i < vm.storms.length; i++) {
                if (vm.storms[i].Id === vm.stormViewModel.Id) {
                    vm.stormViewModel.stormIndex = i;
                    break;
                }
            }

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            stormDataSvc.deleteStorm(vm.stormViewModel.Id).then(function () {
                vm.stormViewModel.isDeleting = true;
                vm.handleAfterSave({ stormFromApi: vm.stormViewModel });
                closeMe();

                toastr.success('Xóa thông tin bão thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Xóa thông tin bão không thành công');
            });
        }

        function editStorm() {
            if (!validate()) return;

            var stormIndex = null;
            for (var i=0; i<vm.storms.length; i++) {
                if (vm.storms[i].Id === vm.stormViewModel.Id) {
                    stormIndex = i;
                    break;
                }
            }

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            stormDataSvc.updateStorm(vm.stormViewModel).then(function (response) {
                vm.stormViewModel = response.data;
                vm.stormViewModel.stormIndex = stormIndex;
                vm.stormViewModel.isDeleting = false;
                vm.handleAfterSave({ stormFromApi: vm.stormViewModel });
                closeMe();

                toastr.success('Chỉnh sửa thông tin tàu thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Chỉnh sửa thông tin tàu không thành công');
            });
        }

        function validate() {
            if (!vm.stormViewModel) {
                toastr.error('Chưa chọn cơn bão cần chỉnh sửa');
                return false;
            }
            if (!vm.stormViewModel.Radius) {
                toastr.error('Chưa nhập bán kính bão');
                return false;
            }
            if (vm.stormViewModel.Radius <= 0) {
                toastr.error('Bán kính bão không hợp lệ');
                return false;
            }
            if (!vm.stormViewModel.Latitude) {
                toastr.error('Chưa nhập vĩ độ tâm bão');
                return false;
            }
            if (vm.stormViewModel.Latitude < 0) {
                toastr.error('Vĩ độ tâm bão không hợp lệ');
                return false;
            }
            if (!vm.stormViewModel.Longitude) {
                toastr.error('Chưa nhập kinh độ tâm bão');
                return false;
            }
            if (vm.stormViewModel.Longitude < 0) {
                toastr.error('Kinh độ tâm bão không hợp lệ');
                return false;
            }

            return true;
        }

    }
})();