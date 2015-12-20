(function () {
    angular
        .module('app')
        .controller('addWarningCtrl', addWarningCtrl);

    addWarningCtrl.$inject = ['$scope', 'pushDownSvc', 'spinnerUtilSvc', 'createWarningLocationDialogSvc', 'createWarningLocationDialogDataSvc'];

    function addWarningCtrl($scope, pushDownSvc, spinnerUtilSvc, createWarningLocationDialogSvc, createWarningLocationDialogDataSvc) {
        var vm = this;

        vm.overlay = $scope.overlay;
        vm.warningLocation = {
            $type: 'WarningLocation'
        };
        vm.warningLocationTypes = createWarningLocationDialogSvc.getWarningLocationTypes();

        vm.createWarningLocation = createWarningLocation;
        vm.close = close;

        function createWarningLocation() {
            if (!createWarningLocationDialogSvc.validateWarningLocation(vm.warningLocation)) return;
            vm.warningLocation.CreatedAt = new Date();

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            createWarningLocationDialogDataSvc.createWarningLocation(vm.warningLocation).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Thêm cảnh báo thành không!');
                close();
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Thêm cảnh báo không thành công!');
            });

        }

        function close() {
            pushDownSvc.hidePushDown();
        }

    }
})();