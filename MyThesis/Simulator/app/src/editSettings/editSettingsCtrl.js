(function () {
    angular
        .module('app')
        .controller('editSettingsCtrl', editSettingsCtrl);

    editSettingsCtrl.$inject = ['$scope', 'pushDownSvc', 'simulatorSettingDialogSvc'];

    function editSettingsCtrl($scope, pushDownSvc, simulatorSettingDialogSvc) {
        var vm = this;

        vm.settingTimeout = simulatorSettingDialogSvc.getSettingTimeout();
        vm.close = close;

        function close() {
            pushDownSvc.hidePushDown();
        }
    }
})();