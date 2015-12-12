(function () {
    'use strict';

    angular
        .module('app')
        .controller('simulateCtrl', simulateCtrl);

    simulateCtrl.$inject = ['userSvc', '$location', 'spinnerUtilSvc', 'commonDataSvc', 'commonSvc'];

    function simulateCtrl(userSvc, $location, spinnerUtilSvc, commonDataSvc, commonSvc) {
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
                    'Tàu': commonSvc.getOverlayShipLocationLayersForSimulate(vm.leafletMap, summaryData.Ships),
                    'Cảnh báo': commonSvc.getOverlayWarningLocationLayers(summaryData.WarningLocations)
                };

                var options = {
                    exclusiveGroups: ['Thời tiết']
                };

                L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(vm.leafletMap);

                L.control.coordinates({
                    position: "bottomleft", //optional default "bootomright"
                    decimals: 6, //optional default 4
                    decimalSeperator: ".", //optional default "."
                    labelTemplateLat: "Vĩ độ: {y} - ", //optional default "Lat: {y}"
                    labelTemplateLng: "Kinh độ: {x}", //optional default "Lng: {x}"
                    enableUserInput: true, //optional default true
                    useDMS: false, //optional default false
                    useLatLngOrder: true, //ordering of labels, default false-> lng-lat
                    markerType: L.marker, //optional default L.marker
                    markerProps: {} //optional default {}
                }).addTo(vm.leafletMap);
                
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Tải dữ liệu thành công');
            }, function() {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải dữ liệu không thành công');
            });
        }

    }
})();