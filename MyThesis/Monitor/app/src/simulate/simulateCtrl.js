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
            setupLeafletMapData();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

        function setupLeafletMap() {
            L.mapbox.accessToken = 'pk.eyJ1IjoidHZsaW5oIiwiYSI6ImNpZzJlMXRubDFiYmp0emt2OTJidmpsdHkifQ.es8RI1Tt5uJAEmE33tWkrw#6/13.699/110.369';
            vm.leafletMap = L.mapbox.map('leaflet-map').setView([13.699, 110.369], 6);
            vm.leafletMap.legendControl.addLegend(document.getElementById('legend').innerHTML);

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
        }

        function setupLeafletMapData() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            commonDataSvc.getSummaryData(vm.currentUser).then(function (response) {
                var summaryData = response.data;
                var baseMaps = [
                    {
                        groupName: "Bản đồ",
                        expanded: true,
                        layers: commonSvc.getBaseMaps(vm.leafletMap)
                    }
                ];

                var internationalShipLocationLayers = commonSvc.getOverlayInternationalShipLocationLayers(vm.leafletMap, summaryData.InternationShipData.Data);
                var shipLocationLayersForSimulate = commonSvc.getOverlayShipLocationLayersForSimulate(vm.leafletMap, summaryData.Ships);

                var overlayLayers = [
                     {
                         groupName: "Thời tiết",
                         layers: commonSvc.getOverlayWeatherLayers()
                     },
                     {
                         groupName: "Tàu quốc tế",
                         layers: internationalShipLocationLayers
                     },
                     {
                         groupName: "Tàu",
                         layers: shipLocationLayersForSimulate
                     },
                    {
                        groupName: "Bão",
                        layers: commonSvc.getOverlayStormLayers(vm.leafletMap, summaryData.Storms)
                    },
                    {
                        groupName: "Cảnh báo",
                        layers: commonSvc.getOverlayWarningLocationLayers(summaryData.WarningLocations)
                    }
                ];

                var options = {
                    container_width: "250px",
                };

                vm.styledLayerControl = L.Control.styledLayerControl(baseMaps, overlayLayers, options);
                vm.leafletMap.addControl(vm.styledLayerControl);

                //vm.leafletMap.addLayer(internationalShipLocationLayers['Tàu quốc tế']);
                vm.leafletMap.addLayer(shipLocationLayersForSimulate['Tất cả']);

                //vm.leafletMap.removeLayer(shipLocationLayersForSimulate['Tất cả']);
                //vm.leafletMap.removeControl(vm.styledLayerControl);
                //vm.leafletMap.addControl(vm.styledLayerControl);
                
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Tải dữ liệu thành công');
            }, function() {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải dữ liệu không thành công');
            });
        }

    }
})();