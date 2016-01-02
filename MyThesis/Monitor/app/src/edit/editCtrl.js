(function () {
    'use strict';

    angular
        .module('app')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['userSvc', '$location', 'homeDataSvc', 'spinnerUtilSvc', 'homeSvc', 'editDataSvc', 'pushDownSvc'];

    function editCtrl(userSvc, $location, homeDataSvc, spinnerUtilSvc, homeSvc, editDataSvc, pushDownSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.ships = [];
        vm.selectedShip = {};
        vm.pushDownSettings = pushDownSvc.getPushDownSettings();

        vm.logout = logout;
        vm.showAddShip = showAddShip;
        vm.showEditShip = showEditShip;
        vm.handleAfterSave = handleAfterSave;
        vm.handleAfterEditShip = handleAfterEditShip;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();

            setupAllShips();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/dang-nhap');
            sessionStorage.removeItem('user');
        }

        function setupAllShips() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            homeDataSvc.getAllShips(vm.currentUser).then(function (response) {
                vm.ships = response.data;
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Tải dữ liệu không thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            });
        }

        function showAddShip() {
            pushDownSvc.showAddShip();
        }

        function showEditShip() {
            pushDownSvc.showEditShip();
        }

        function handleAfterSave(shipFromApi) {
            vm.ships.push(shipFromApi);
        }

        function handleAfterEditShip(shipFromApi) {
            if (shipFromApi.isDeleting) {
                vm.ships.splice(shipFromApi.shipIndex, 1);
            } else {
                vm.ships[shipFromApi.shipIndex] = shipFromApi;
            }
        }


    }

})();