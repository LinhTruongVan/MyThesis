(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'userSvc', '$location', 'spinnerUtilSvc', 'commonDataSvc', 'commonSvc', '$interval'];

    function homeCtrl($scope, userSvc, $location, spinnerUtilSvc, commonDataSvc, commonSvc, $interval) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.leafletMap = {};
        vm.intervalForReloadData = {};

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

                var baseMaps = [
                    {
                        groupName: "Bản đồ",
                        expanded: true,
                        layers: commonSvc.getBaseMaps(vm.leafletMap)
                    }
                ];

                var internationalShipLocationLayers = commonSvc.getOverlayInternationalShipLocationLayers(vm.leafletMap, summaryData.InternationShipData.Data);
                var shipLocationLayersForMonitor = commonSvc.getOverlayShipLocationLayersForMonitor(vm.leafletMap, summaryData.Ships);

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
                          layers: shipLocationLayersForMonitor
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

                var styledLayerControl = L.Control.styledLayerControl(baseMaps, overlayLayers, options);
                vm.leafletMap.addControl(styledLayerControl);

                vm.leafletMap.addLayer(internationalShipLocationLayers['Tàu quốc tế']);
                vm.leafletMap.addLayer(shipLocationLayersForMonitor['Tất cả']);

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

                var minDistanceForSafe = 50;
                vm.shipIdsHasIncidentWithInternationalShip = commonSvc.getShipIdsHasIncidentWithInternationalShip(summaryData.Ships, summaryData.InternationShipData.Data, minDistanceForSafe * 1000);
                if (vm.shipIdsHasIncidentWithInternationalShip.length > 0) {
                    vm.warningMessage = '<div>Tàu (<strong>' + vm.shipIdsHasIncidentWithInternationalShip.join(',') + '</strong>) đang trong khu vực có bán kính dưới ' + minDistanceForSafe + 'km so với tàu quốc tế. Hãy cẩn thận để tránh va chạm</div>';
                    toastr.warning(vm.warningMessage);
                }

                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                //toastr.success('Tải dữ liệu thành công');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                //toastr.error('Tải dữ liệu không thành công');
            });
        }

    }
})();