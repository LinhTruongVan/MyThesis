(function () {
    angular
        .module('app')
        .controller('addStormCtrl', addStormCtrl);

    addStormCtrl.$inject = ['$scope', 'pushDownSvc', 'spinnerUtilSvc', 'addStormDataSvc'];

    function addStormCtrl($scope, pushDownSvc, spinnerUtilSvc, addStormDataSvc) {
        var vm = this;

        vm.storm = {};
        vm.overlay = $scope.overlay;

        vm.close = close;
        vm.createStorm = createStorm;

        function createStorm() {
            if (!validateStorm()) return;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            addStormDataSvc.createStorm(vm.storm).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Thêm bão thành không!');
                close();
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Thêm bão không thành công!');
            });

        }

        function validateStorm() {
            if (!vm.storm.Name) {
                toastr.error('Chưa nhập tên bão');
                return false;
            }
            if (!vm.storm.Latitude) {
                toastr.error('Chưa nhập vĩ độ của tâm bão');
                return false;
            }
            if (!vm.storm.Longitude) {
                toastr.error('Chưa nhập kinh độ của tâm bão');
                return false;
            }
            if (!vm.storm.Radius) {
                toastr.error('Chưa nhập bán kính của bão');
                return false;
            }

            return true;
        }

        function close() {
            pushDownSvc.hidePushDown();
        }

    }
})();