(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['spinnerUtilSvc', '$uibModal', 'homeSvc', 'homeDataSvc'];

    function homeCtrl(spinnerUtilSvc, $uibModal, homeSvc, homeDataSvc) {
        var vm = this;
        //vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.ships = [];
        vm.timeout = 10;
        vm.timeoutForSendLocation = 20;

        vm.openCreateShipDialog = openCreateShipDialog;
        vm.openCreateWarningLocationDialog = openCreateWarningLocationDialog;

        init();

        function init(){
            //spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            //indexDataSvc.getShips().then(function(response){
            //    spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            //    toastr.success('Get ships was successful!');

            //    indexSvc.setShips(response.data);
            //    vm.ships = indexSvc.getShips();
            //}, function(error){
            //    spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            //    toastr.error('Get ships was not successful!');
            //});
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
              templateUrl: "/src/components/createWarningLocationDialog/create-warning-location-dialog.html",
              controller: "createWarningLocationDialogCtrl",
              resolve: {
                overlay: vm.overlay
              }
            });
        }

    }
    
})();