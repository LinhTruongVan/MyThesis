(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'userSvc', '$location', 'spinnerUtilSvc', 'commonDataSvc', 'commonSvc'];

    function homeCtrl($scope, userSvc, $location, spinnerUtilSvc, commonDataSvc, commonSvc) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.leafletMap = {};

        vm.logout = logout;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();
            setupLeafletMap();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

        function setupLeafletMap() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            commonDataSvc.getSummaryData(vm.currentUser).then(function (response) {
                var summaryData = response.data;

                L.mapbox.accessToken = 'pk.eyJ1IjoidHZsaW5oIiwiYSI6ImNpZzJlMXRubDFiYmp0emt2OTJidmpsdHkifQ.es8RI1Tt5uJAEmE33tWkrw#6/13.699/110.369';
                vm.leafletMap = L.mapbox.map('leaflet-map').setView([13.699, 110.369], 6);

                var baseMaps = commonSvc.getBaseMaps(vm.leafletMap);
                var groupedOverlays = {
                    'Thời tiết': commonSvc.getOverlayWeatherLayers(),
                    'Tàu quốc tế': commonSvc.getOverlayInternationalShipLocationLayers(vm.leafletMap, summaryData.InternationShipData.Data),
                    'Tàu': commonSvc.getOverlayShipLocationLayersForMonitor(vm.leafletMap, summaryData.Ships),
                    'Cảnh báo': commonSvc.getOverlayWarningLocationLayers(summaryData.WarningLocations)
                };

                var options = {
                    exclusiveGroups: ['Thời tiết']
                };

                L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(vm.leafletMap);

                L.control.coordinates({
                    position: "bottomleft",
                    decimals: 6,
                    decimalSeperator: ".",
                    labelTemplateLat: "Vĩ độ: {y} - ",
                    labelTemplateLng: "Kinh độ: {x}",
                    enableUserInput: true,
                    useDMS: false,
                    useLatLngOrder: true,
                    markerType: L.marker,
                    markerProps: {} 
                }).addTo(vm.leafletMap);

                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Tải dữ liệu thành công');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải dữ liệu không thành công');
            });
        }

    }
})();