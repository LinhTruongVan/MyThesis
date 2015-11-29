﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['userSvc', '$location', 'homeDataSvc', 'spinnerUtilSvc', 'homeSvc'];

    function homeCtrl(userSvc, $location, homeDataSvc, spinnerUtilSvc, homeSvc) {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.leafletMap = {};
        vm.leafletMapLayers = [];
        vm.selectedMapLayer = {};

        vm.ships = [];

        vm.logout = logout;
        vm.changeMapLayer = changeMapLayer;

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

                vm.ships = response.data;
                homeSvc.setupLastLocationForShips(vm.ships);

                setupMapLayers(vm.ships);
                vm.mapLayerGroup = L.layerGroup([]).addTo(vm.leafletMap);
                vm.mapLayerGroup.addLayer(vm.leafletMapLayers[0].layer);
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Tải danh sách tàu không thành công');
            });
        }

        function setupMapLayers(ships) {
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
            var customIcon = L.icon({
                iconUrl: '../../assets/img/ship-marker/green.png',
                iconSize: [18, 18]
            });
            return L.rotatedMarker(location, { icon: customIcon, angle: currentLocation.Angle }).bindPopup(htmlPopup);

            function buildMarkerPopup() {
                var htmlBuilder = [];

                htmlBuilder.push([
                    '<div><strong>Mã tàu: </strong>' + currentShip.Id + '</div>',
                    '<div><strong>Thuyền trưởng: </strong>' + currentShip.Caption + '</div>',
                    '<div><strong>Loại tàu: </strong>' + currentShip.displayType + '</div>',
                    '<div><strong>Vận tốc: </strong>' + currentShip.Speed + 'km/h</div>',
                    '<div><strong>Trọng tải: </strong>' + currentShip.Weight + 'kg</div>'
                ]);

                return htmlBuilder.join('');
            }
        }

        function changeMapLayer() {
            vm.mapLayerGroup.clearLayers();
            vm.mapLayerGroup.addLayer(vm.selectedMapLayer);
        }

    }

})();