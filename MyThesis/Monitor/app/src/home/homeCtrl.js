(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'userSvc', '$location', 'homeDataSvc', 'spinnerUtilSvc', 'homeSvc', 'internationalShipSvc',
        'warningLocationConst', '$interval', 'internationalShipDataSvc'];

    function homeCtrl($scope, userSvc, $location, homeDataSvc, spinnerUtilSvc, homeSvc, internationalShipSvc,
        warningLocationConst, $interval, internationalShipDataSvc) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.leafletMap = {};
        vm.leafletMapLayers = [];
        vm.selectedMapLayer = {};
        vm.mapLayerGroup = {};

        vm.warningLocationMapLayer = {};
        vm.mapLayerGroupForWarningLocation = {};

        vm.ships = [];
        vm.setTimeoutForUpdateLocation = {};

        vm.logout = logout;
        vm.changeMapLayer = changeMapLayer;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();

            setupMap();
            setupInternationalShips();
            setupAllShips();
            setupWaringLocations();

            //vm.setTimeoutForUpdateLocation = $interval(function () {
            //    vm.mapLayerGroup.clearLayers();
            //    vm.mapLayerGroupForWarningLocation.clearLayers();
            //    setupAllShips();
            //    setupWaringLocations();
            //}, 10000);

            //$scope.$on('$destroy', function () {
            //    $interval.cancel(vm.setTimeoutForUpdateLocation);
            //});
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

            var OpenWeatherMap_Wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
                opacity: 0.5
            }).addTo(vm.leafletMap);

            L.control.coordinates({
                position: "bottomright", //optional default "bootomright"
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

        function setupInternationalShips() {
            internationalShipDataSvc.getShipLocations().success(function (shipLocations) {
                var internationalShipLayer = internationalShipSvc.getInternationalShipLayer(shipLocations.data);
                L.layerGroup([internationalShipLayer]).addTo(vm.leafletMap);
            });
        }

        function setupAllShips() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            homeDataSvc.getAllShips(vm.currentUser).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                //toastr.success('Tải danh sách tàu thành công');

                vm.ships = response.data;
                homeSvc.setupLastLocationForShips(vm.ships);

                setupShipMapLayers(vm.ships);
                vm.mapLayerGroup = L.layerGroup([]).addTo(vm.leafletMap);
                vm.mapLayerGroup.addLayer(vm.leafletMapLayers[0].layer);
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải danh sách tàu không thành công');
            });
        }

        function setupShipMapLayers(ships) {
            vm.leafletMapLayers = [
                {
                    shipId: 'all',
                    name: 'Tất cả'
                }
            ];
            var shipLatestLocationMarkers = [];

            ships.forEach(function (ship) {
                var shipMarkers = [];
                ship.ShipLocations.forEach(function (location) {
                    shipMarkers.push(buildMarkerForShip(ship, location));
                });
                vm.leafletMapLayers.push({
                    shipId: ship.Id,
                    name: 'Mã tàu: ' + ship.Id,
                    layer: L.layerGroup(shipMarkers)
                });
                shipLatestLocationMarkers.push(buildMarkerForShip(ship, ship.latestLocation));
            });

            vm.leafletMapLayers[0].layer = L.layerGroup(shipLatestLocationMarkers);
        }

        function buildMarkerForShip(currentShip, currentLocation) {
            var htmlPopup = buildMarkerPopup();
            var location = [currentLocation.Latitude, currentLocation.Longitude];

            var customIcon = {};
            if (currentLocation.ShipStatus !== 0) {
                customIcon = L.icon({
                    iconUrl: '../../assets/img/ship-marker/red.png',
                    iconSize: [15, 15]
                });
            } else {
                customIcon = L.icon({
                    iconUrl: '../../assets/img/ship-marker/green.png',
                    iconSize: [15, 15]
                });
            }

            return L.rotatedMarker(location, { icon: customIcon, angle: currentLocation.Angle }).bindPopup(htmlPopup);

            function buildMarkerPopup() {
                var htmlBuilder = '';

                htmlBuilder += '<div><strong>Mã tàu: </strong>' + currentShip.Id + '</div>';
                htmlBuilder += '<div><strong>Thuyền trưởng: </strong>' + currentShip.Caption + '</div>';
                htmlBuilder += '<div><strong>Loại tàu: </strong>' + currentShip.displayType + '</div>';
                htmlBuilder += '<div><strong>Vận tốc: </strong>' + currentShip.Speed + 'km/h</div>';
                htmlBuilder += '<div><strong>Trọng tải: </strong>' + currentShip.Weight + 'kg</div>';

                return htmlBuilder;
            }
        }

        function changeMapLayer() {
            vm.mapLayerGroup.clearLayers();
            vm.mapLayerGroup.addLayer(vm.selectedMapLayer);
        }

        function setupWaringLocations() {
            homeDataSvc.getAllWarningLocations().then(function (response) {
                vm.warningLocations = response.data;
                vm.warningLocationMapLayer = getWarningLocationLayer(vm.warningLocations);
                vm.mapLayerGroupForWarningLocation = L.layerGroup([]).addTo(vm.leafletMap);
                vm.mapLayerGroupForWarningLocation.addLayer(vm.warningLocationMapLayer);
            });
        }

        function getWarningLocationLayer(warningLocations) {
            var warningLocationsMarker = [];

            warningLocations.forEach(function (location) {
                warningLocationsMarker.push(buildMarkerForWarningLocation(location));
            });

            return L.layerGroup(warningLocationsMarker);

            function buildMarkerForWarningLocation(currentLocation) {
                var htmlPopup = buildMarkerWarningLocationPopup();
                var customIcon = getWarningLocationMarkerIcon(currentLocation);

                return L.marker([currentLocation.Latitude, currentLocation.Longitude], { icon: customIcon }).bindPopup(htmlPopup);

                function buildMarkerWarningLocationPopup() {
                    var htmlBuilder = [];

                    htmlBuilder.push([
                        '<div><strong>Loại cảnh báo: </strong>' + getWarningLocationTypeName(currentLocation) + '</div>',
                        '<div><strong>Vĩ độ: </strong>' + currentLocation.Latitude + '</div>',
                        '<div><strong>Tọa độ: </strong>' + currentLocation.Longitude + '</div>',
                        '<div><strong>Chi tiết: </strong>' + (currentLocation.Description ? currentLocation.Description : 'N/A') + '</div>'
                    ]);

                    return htmlBuilder.join('');
                }
            }

            function getWarningLocationTypeName(warningLocation) {
                switch (warningLocation.WarningLocationType) {
                    case warningLocationConst.reef.value:
                        return warningLocationConst.reef.name;
                    case warningLocationConst.chinaShip.value:
                        return warningLocationConst.chinaShip.name;
                    case warningLocationConst.pirateShip.value:
                        return warningLocationConst.pirateShip.name;
                }

                return;
            }

            function getWarningLocationMarkerIcon(currentLocation) {
                var customIcon = {};

                switch (currentLocation.WarningLocationType) {
                    case warningLocationConst.reef.value:
                        customIcon = L.icon({
                            iconUrl: '../../assets/img/warning-location/reef.png',
                            iconSize: [20, 14]
                        });
                        return customIcon;
                    case warningLocationConst.chinaShip.value:
                        customIcon = L.icon({
                            iconUrl: '../../assets/img/warning-location/china-ship.png',
                            iconSize: [20, 14]
                        });
                        return customIcon;
                    case warningLocationConst.pirateShip.value:
                        customIcon = L.icon({
                            iconUrl: '../../assets/img/warning-location/pirate-ship.png',
                            iconSize: [20, 14]
                        });
                        return customIcon;
                }
                return customIcon;
            }
        }

    }
})();