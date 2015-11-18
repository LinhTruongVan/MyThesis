(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['spinnerUtilSvc', '$uibModal', 'homeSvc', 'shipDataSvc'];

    function homeCtrl(spinnerUtilSvc, $uibModal, homeSvc, shipDataSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.ships = [];

        vm.openCreateShipDialog = openCreateShipDialog;
        vm.openCreateWarningLocationDialog = openCreateWarningLocationDialog;
        vm.openSimulatorSettingDialog = openSimulatorSettingDialog;

        init();

        function init(){
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.getAllShips().then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Tải danh sách tàu thành công!');

                homeSvc.setShips(response.data);
                vm.ships = homeSvc.getShips();
            }, function(error){
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải danh sách tàu không thành công!');
            });
        }

        function openCreateShipDialog(){
            $uibModal.open({
              templateUrl: "src/createShipDialog/create-ship-dialog.html",
              controller: "createShipDialogCtrl",
              resolve: {
                overlay: vm.overlay
              }
            });
        }

        function openCreateWarningLocationDialog(){
            $uibModal.open({
                templateUrl: "/src/createWarningLocationDialog/create-warning-location-dialog.html",
              controller: "createWarningLocationDialogCtrl",
              resolve: {
                overlay: vm.overlay
              }
            });
        }

        function openSimulatorSettingDialog() {
            $uibModal.open({
                templateUrl: "/src/simulatorSettingDialog/simulator-setting-dialog.html",
                controller: "simulatorSettingDialogCtrl"
            });
        }

    }
    
})();