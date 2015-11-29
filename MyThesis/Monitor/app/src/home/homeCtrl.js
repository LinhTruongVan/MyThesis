(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['userSvc', '$location', 'homeDataSvc', 'spinnerUtilSvc', 'homeSvc'];

    function homeCtrl(userSvc, $location, homeDataSvc, spinnerUtilSvc, homeSvc) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.leafletMap = {};

        vm.logout = logout;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();

            setupMap();
            setupAllShips();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

        function setupMap() {
            L.mapbox.accessToken = 'pk.eyJ1IjoidHZsaW5oIiwiYSI6ImNpZzJlMXRubDFiYmp0emt2OTJidmpsdHkifQ.es8RI1Tt5uJAEmE33tWkrw#6/13.699/110.369';
            vm.leafletMap = L.mapbox.map('leaflet-map', 'mapbox.streets')
            .setView([13.699, 110.369], 6);
        }

        function setupAllShips() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            homeDataSvc.getAllShips(vm.currentUser).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Tải danh sách tàu thành công');

                //homeSvc.setupLastLocationForShips();
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải danh sách tàu không thành công');
            });
        }

    }

})();