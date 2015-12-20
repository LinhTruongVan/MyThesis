(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['spinnerUtilSvc', 'homeSvc', 'shipDataSvc', 'simulatorSettingDialogSvc',
    'homeDataSvc', 'pushDownSvc'];

    function homeCtrl(spinnerUtilSvc, homeSvc, shipDataSvc, simulatorSettingDialogSvc,
        homeDataSvc, pushDownSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.ships = [];
        vm.users = [];
        vm.settingTimeout = simulatorSettingDialogSvc.getSettingTimeout();

        vm.pushDownSettings = pushDownSvc.getPushDownSettings();
        vm.showAddShip = showAddShip;
        vm.showAddWarning = showAddWarning;
        vm.showAddStorm = showAddStorm;
        vm.showEditSettings = showEditSettings;

        init();

        function init() {
            setupDataForShips();
            setupDataForUsers();
        }

        function setupDataForShips() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.getAllShips().then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Tải danh sách tàu thành công!');

                homeSvc.setShips(response.data);
                vm.ships = homeSvc.getShips();
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải danh sách tàu không thành công!');
            });
        }

        function setupDataForUsers() {
            homeDataSvc.getAllUsers().then(function (response) {
                vm.users = response.data;
            });
        }

        function showAddShip() {
            pushDownSvc.showAddShip();
        }

        function showAddWarning() {
            pushDownSvc.showAddWarning();
        }

        function showAddStorm() {
            pushDownSvc.showAddStorm();
        }

        function showEditSettings() {
            pushDownSvc.showEditSettings();
        }

    }
})();