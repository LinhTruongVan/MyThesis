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
            setupLeafletMapLayers();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }

        function setupLeafletMap() {
            L.mapbox.accessToken = 'pk.eyJ1IjoidHZsaW5oIiwiYSI6ImNpZzJlMXRubDFiYmp0emt2OTJidmpsdHkifQ.es8RI1Tt5uJAEmE33tWkrw#6/13.699/110.369';
            vm.leafletMap = L.mapbox.map('leaflet-map').setView([13.699, 110.369], 6);

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

            vm.baseMaps = [
                {
                    groupName: "Bản đồ",
                    expanded: true,
                    layers: commonSvc.getBaseMaps(vm.leafletMap)
                }
            ];

            vm.options = {
                container_width: "250px",
            };
        }

        function setupLeafletMapLayers() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            commonDataSvc.getSummaryData(vm.currentUser).then(function (response) {
                var summaryData = response.data;

                vm.overlayLayers = [
                     {
                         groupName: "Thời tiết",
                         layers: commonSvc.getOverlayWeatherLayers()
                     },
                      {
                          groupName: "Tàu quốc tế",
                          layers: commonSvc.getOverlayInternationalShipLocationLayers(vm.leafletMap, summaryData.InternationShipData.Data)
                      },
                      {
                          groupName: "Tàu",
                          layers: commonSvc.getOverlayShipLocationLayersForMonitor(vm.leafletMap, summaryData.Ships)
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

                vm.styledLayerControl = L.Control.styledLayerControl(vm.baseMaps, vm.overlayLayers, vm.options);
                vm.leafletMap.addControl(vm.styledLayerControl);

                vm.leafletMap.addLayer(vm.overlayLayers[1].layers['Tàu quốc tế']);
                vm.leafletMap.addLayer(vm.overlayLayers[2].layers['Tất cả']);
                vm.leafletMap.addLayer(vm.overlayLayers[3].layers['Bão']);

                setupWarningMessageForShipAndInternationShip(summaryData, 50);
                setupWarningMessageForShipAndStorm(summaryData, 50);
                //vm.intervalForReloadData = $interval(function () {
                //    reloadLeafletMapLayers();
                //}, 10000);

                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            });
        }

        function setupWarningMessageForShipAndInternationShip(data, distance) {
            vm.shipIdsHasIncidentWithInternationalShip = commonSvc.getShipIdsHasIncidentWithInternationalShip(data.Ships, data.InternationShipData.Data, distance * 1000);
            if (vm.shipIdsHasIncidentWithInternationalShip.length > 0) {
                vm.warningMessage = '<div>Tàu (<strong>' + vm.shipIdsHasIncidentWithInternationalShip.join(',') + '</strong>) đang trong khu vực có bán kính dưới ' + distance + 'km so với tàu quốc tế. Hãy cẩn thận để tránh va chạm</div>';
                toastr.warning(vm.warningMessage);
            }
        }

        function setupWarningMessageForShipAndStorm(data, distance) {
            vm.shipIdsHasIncidentWithStorm = commonSvc.getShipIdsHasIncidentWithStorm(data.Ships, data.Storms, distance);
            if (vm.shipIdsHasIncidentWithStorm.length > 0) {
                var stormNames = data.Storms.map(function (item) {
                    return item.Name;
                });
                vm.warningMessageForStorm = '<div>Tàu (<strong>' + vm.shipIdsHasIncidentWithStorm.join(',') + '</strong>) đang trong khu vực nguy hiểm của bão <strong>(' + stormNames.join(',') + ')</strong>.</div>';
                toastr.warning(vm.warningMessageForStorm);
            }
        }

        function reloadLeafletMapLayers() {
            commonDataSvc.getSummaryData(vm.currentUser).then(function (response) {
                var summaryData = response.data;

                for (var i = 0; i < vm.overlayLayers.length; i++) {
                    vm.styledLayerControl.removeGroup(vm.overlayLayers[i].groupName);
                }

                vm.leafletMap.removeLayer(vm.overlayLayers[1].layers['Tàu quốc tế']);
                vm.leafletMap.removeLayer(vm.overlayLayers[2].layers['Tất cả']);
                vm.leafletMap.removeLayer(vm.overlayLayers[3].layers['Bão']);

                vm.overlayLayers = [
                     {
                         groupName: "Thời tiết",
                         layers: commonSvc.getOverlayWeatherLayers()
                     },
                      {
                          groupName: "Tàu quốc tế",
                          layers: commonSvc.getOverlayInternationalShipLocationLayers(vm.leafletMap, summaryData.InternationShipData.Data)
                      },
                      {
                          groupName: "Tàu",
                          layers: commonSvc.getOverlayShipLocationLayersForMonitor(vm.leafletMap, summaryData.Ships)
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

                vm.leafletMap.removeControl(vm.styledLayerControl);
                vm.styledLayerControl = L.Control.styledLayerControl(vm.baseMaps, vm.overlayLayers, vm.options);
                vm.leafletMap.addControl(vm.styledLayerControl);

                vm.leafletMap.addLayer(vm.overlayLayers[1].layers['Tàu quốc tế']);
                vm.leafletMap.addLayer(vm.overlayLayers[2].layers['Tất cả']);
                vm.leafletMap.addLayer(vm.overlayLayers[3].layers['Bão']);

                setupWarningMessageForShipAndInternationShip(summaryData, 50);
            });
        }

    }
})();