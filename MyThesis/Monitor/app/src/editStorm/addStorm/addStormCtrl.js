(function () {
    'use strict';

    angular
        .module('app')
        .controller('addStormCtrl', addStormCtrl);

    addStormCtrl.$inject = ['$scope', 'pushDownSvc', 'settingConst', 'stormDataSvc', 'spinnerUtilSvc'];

    function addStormCtrl($scope, pushDownSvc, settingConst, stormDataSvc, spinnerUtilSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.stormViewModel = {};

        vm.close = closeMe;
        vm.addStorm = addStorm;
        vm.handleAfterSave = $scope.handleAfterSave;

        function closeMe() {
            pushDownSvc.close();
        }

        function addStorm() {
            if (!validate()) return;

            vm.stormViewModel.CreatedAt = new Date();

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            stormDataSvc.addStorm(vm.stormViewModel).then(function (response) {
                vm.handleAfterSave({ stormFromApi: response.data });
                closeMe();

                toastr.success('Thêm cơn bão thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Thêm cơn bão không thành công');
            });
        }

        function validate() {
            if (!vm.stormViewModel.Name) {
                toastr.error('Chưa nhập tên cơn bão');
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