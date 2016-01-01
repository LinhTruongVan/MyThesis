(function () {
    'use strict';

    angular
        .module('app')
        .controller('simulateCtrl', simulateCtrl);

    simulateCtrl.$inject = ['userSvc', '$location', 'spinnerUtilSvc', 'commonDataSvc', 'commonSvc', '$timeout'];

    function simulateCtrl(userSvc, $location, spinnerUtilSvc, commonDataSvc, commonSvc, $timeout) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));
        vm.leafletMap = {};
        vm.simulateSettings = {};
        vm.progressBarSettings = {
            totalTimes: 1,
            isRunning: false,
            isDisplay: false
        };

        var mainToggleButton = angular.element('#mainToggleButton');

        vm.logout = logout;
        vm.applySettings = applySettings;

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
                vm.summaryData = response.data;
                vm.baseMaps = [
                    {
                        groupName: "Bản đồ",
                        expanded: true,
                        layers: commonSvc.getBaseMaps(vm.leafletMap)
                    }
                ];

                vm.internationalShipLocationLayers = commonSvc.getOverlayInternationalShipLocationLayers(vm.leafletMap, vm.summaryData.InternationShipData.Data);
                //vm.shipLocationLayersForSimulate = commonSvc.getOverlayShipLocationLayersForSimulate(vm.leafletMap, vm.summaryData.Ships, vm.selectedSpeedValue);
                vm.overlayStormLayers = commonSvc.getOverlayStormLayers(vm.leafletMap, vm.summaryData.Storms);
                vm.overlayWarningLocationLayers = commonSvc.getOverlayWarningLocationLayers(vm.summaryData.WarningLocations);
                vm.overlayWeatherLayers = commonSvc.getOverlayWeatherLayers();

                vm.overlayLayers = [
                     {
                         groupName: "Thời tiết",
                         layers: vm.overlayWeatherLayers
                     },
                     {
                         groupName: "Tàu quốc tế",
                         layers: vm.internationalShipLocationLayers
                     },
                     {
                         groupName: "Tàu",
                         layers: null
                     },
                    {
                        groupName: "Bão",
                        layers: vm.overlayStormLayers
                    },
                    {
                        groupName: "Cảnh báo",
                        layers: vm.overlayWarningLocationLayers
                    }
                ];

                vm.options = {
                    container_width: "250px"
                };

                //vm.styledLayerControl = L.Control.styledLayerControl(vm.baseMaps, vm.overlayLayers, vm.options);
                //vm.leafletMap.addControl(vm.styledLayerControl);

                //vm.leafletMap.addLayer(internationalShipLocationLayers['Tàu quốc tế']);
                //vm.leafletMap.addLayer(vm.shipLocationLayersForSimulate['Tất cả']);
                
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function() {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            });
        }

        function applySettings() {
            if (!validateSimluateSettings()) return;

            var filterdShips = commonSvc.getShipAfterFilterOut(vm.summaryData.Ships, vm.simulateSettings);
            if (filterdShips.length <= 0) {
                toastr.warning('Danh sách tàu không hợp lệ');
                return;
            }

            var maxNumOfLocations = 0;
            filterdShips.forEach(function(filterdShip) {
                var numOfShipLocations = filterdShip.ShipLocations.length;
                if (maxNumOfLocations <= numOfShipLocations) maxNumOfLocations = numOfShipLocations;
            });

            if (vm.overlayLayers[2].layers) {
                for (var key in vm.overlayLayers[2].layers) {
                    vm.leafletMap.removeLayer(vm.overlayLayers[2].layers[key]);
                }
                vm.leafletMap.removeControl(vm.styledLayerControl);
            }

            vm.overlayLayers[2].layers = commonSvc.getOverlayShipLocationLayersForSimulate(vm.leafletMap, filterdShips, vm.simulateSettings.totalTime / maxNumOfLocations);

            vm.styledLayerControl = L.Control.styledLayerControl(vm.baseMaps, vm.overlayLayers, vm.options);
            vm.leafletMap.addControl(vm.styledLayerControl);

            vm.progressBarSettings.totalTimes = vm.simulateSettings.totalTime;
            vm.progressBarSettings.isDisplay = false;

            $timeout(function () {
                vm.progressBarSettings.isDisplay = true;
                vm.progressBarSettings.isRunning = true;
                vm.leafletMap.addLayer(vm.overlayLayers[2].layers['Tất cả']);
            }, 1000);
            

            mainToggleButton.click();
        }

        function validateSimluateSettings() {
            if (!vm.simulateSettings.totalTime || vm.simulateSettings.totalTime <= 0) {
                toastr.error('Chưa nhập tổng thời gian mô phỏng');
                return false;
            }
            if (!vm.simulateSettings.startAt) {
                toastr.error('Chưa chọn ngày bắt đầu');
                return false;
            }
            if (!vm.simulateSettings.endAt) {
                toastr.error('Chưa chọn ngày kết thúc');
                return false;
            }
            if (vm.simulateSettings.startAt > vm.simulateSettings.endAt) {
                toastr.error('Ngày bắt đầu không được lớn hơn ngày kết thúc');
                return false;
            }

            return true;
        }

    }
})();