(function () {
    'use strict';

    angular
        .module('app')
        .factory('commonSvc', commonSvc);

    commonSvc.$inject = ['settingConst', 'warningLocationConst'];

    function commonSvc(settingConst, warningLocationConst) {

        var service = {
            getBaseMaps: getBaseMaps,
            getOverlayWeatherLayers: getOverlayWeatherLayers,
            getOverlayWarningLocationLayers: getOverlayWarningLocationLayers,
            getOverlayShipLocationLayersForSimulate: getOverlayShipLocationLayersForSimulate,
            getOverlayInternationalShipLocationLayers: getOverlayInternationalShipLocationLayers,
            getOverlayShipLocationLayersForMonitor: getOverlayShipLocationLayersForMonitor
        };
        return service;

        function getBaseMaps(leafletMap) {
            return {
                'StreetMap(1)': L.mapbox.tileLayer('mapbox.streets').addTo(leafletMap),
                'StreetMap(2)': L.mapbox.tileLayer('mapbox.streets-basic'),
                'Satellite': L.mapbox.tileLayer('mapbox.satellite')
            };
        }

        function getOverlayWeatherLayers() {
            var sharingData = {
                maxZoom: 19,
                attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
                opacity: 0.5
            };

            return {
                'Gió': L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png', sharingData),
                'Mưa': L.tileLayer('http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png', sharingData),
                'Mây': L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', sharingData),
                'Nhiệt độ': L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png', sharingData)
            };
        }

        function getOverlayWarningLocationLayers(warningLocations) {
            var layerGroup = {
                'Bãi rạn': new L.LayerGroup(),
                'Tàu/thuyền hải tặc': new L.LayerGroup(),
                'Tàu/thuyền Trung Quốc': new L.LayerGroup()
            };

            setupWarningLocationMarkers();

            return layerGroup;

            function setupWarningLocationMarkers() {
                warningLocations.forEach(function (location) {
                    var customIcon = getWarningLocationMarkerIcon(location),
                        htmlPopup = getWarningLocationPopup(location);

                    switch (location.WarningLocationType) {
                        case warningLocationConst.reef.value:
                            L.marker([location.Latitude, location.Longitude], { icon: customIcon }).bindPopup(htmlPopup).addTo(layerGroup['Bãi rạn']);
                            break;
                        case warningLocationConst.chinaShip.value:
                            L.marker([location.Latitude, location.Longitude], { icon: customIcon }).bindPopup(htmlPopup).addTo(layerGroup['Tàu/thuyền Trung Quốc']);
                            break;
                        case warningLocationConst.pirateShip.value:
                            L.marker([location.Latitude, location.Longitude], { icon: customIcon }).bindPopup(htmlPopup).addTo(layerGroup['Tàu/thuyền hải tặc']);
                            break;
                    }
                });

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

                function getWarningLocationPopup(currentLocation) {
                    var htmlBuilder = '';

                    htmlBuilder += '<div><strong>Vĩ độ: </strong>' + currentLocation.Latitude + '</div>';
                    htmlBuilder += '<div><strong>Kinh độ: </strong>' + currentLocation.Longitude + '</div>';
                    htmlBuilder += '<div><strong>Chi tiết: </strong>' + (currentLocation.Description ? currentLocation.Description : 'N/A') + '</div>';

                    return htmlBuilder;

                    function getWarningLocationTypeName() {
                        switch (currentLocation.WarningLocationType) {
                            case warningLocationConst.reef.value:
                                return warningLocationConst.reef.name;
                            case warningLocationConst.chinaShip.value:
                                return warningLocationConst.chinaShip.name;
                            case warningLocationConst.pirateShip.value:
                                return warningLocationConst.pirateShip.name;
                        }

                        return '';
                    }
                }
            }
        }

        function getOverlayShipLocationLayersForSimulate(leafletMap, ships) {
            var layers = {
                'Tất cả': new L.LayerGroup().addTo(leafletMap)
            };

            var movingMarkers = getAllMovingMarkerForShips();
            ships.forEach(function (ship) {
                var indentifyName = 'Mã tàu ' + ship.Id;
                layers[indentifyName] = new L.LayerGroup();

                angular.copy(movingMarkers[ship.Id]).addTo(layers[indentifyName]);
                movingMarkers[ship.Id].addTo(layers['Tất cả']);
            });

            return layers;

            function getAllMovingMarkerForShips() {
                var markers = {};

                var customIcon = L.icon({
                    iconUrl: '../../assets/img/ship-marker/moving.png',
                    iconSize: [25, 30]
                });

                ships.forEach(function (ship) {
                    var htmlPopup = getShipLocationPopup(ship),
                        shipLocations = [],
                        runningTimes = [];

                    ship.ShipLocations.forEach(function (location) {
                        shipLocations.push([location.Latitude, location.Longitude]);
                        runningTimes.push(10000);
                    });

                    var movingMarker = L.Marker.movingMarker(shipLocations, runningTimes, { loop: true, autostart: true }).bindPopup(htmlPopup);
                    movingMarker.setIcon(customIcon);
                    movingMarker.openPopup();

                    markers[ship.Id] = movingMarker;
                });

                return markers;

                function getShipLocationPopup(currentShip) {
                    var htmlBuilder = '';

                    htmlBuilder += '<div><strong>Mã tàu: </strong>' + currentShip.Id + '</div>';
                    htmlBuilder += '<div><strong>Thuyền trưởng: </strong>' + currentShip.Caption + '</div>';
                    htmlBuilder += '<div><strong>Loại tàu: </strong>' + currentShip.displayType + '</div>';
                    htmlBuilder += '<div><strong>Vận tốc: </strong>' + currentShip.Speed + ' km/h</div>';
                    htmlBuilder += '<div><strong>Trọng tải: </strong>' + currentShip.Weight + ' kg</div>';

                    return htmlBuilder;
                }
            }
        }

        function getOverlayInternationalShipLocationLayers(leafletMap, shipLocations) {
            var layerGroup = {
                'Tàu quốc tế': new L.LayerGroup().addTo(leafletMap)
            }

            setupInternationShipMarkers();

            return layerGroup;

            function setupInternationShipMarkers() {
                var customIcon = L.icon({
                    iconUrl: '../../assets/img/ship-marker/international-ship.png',
                    iconSize: [11, 12]
                });

                shipLocations.forEach(function (location) {
                    var htmlPopup = getInternationShipPopup(location);
                    L.marker(location, { icon: customIcon }).bindPopup(htmlPopup).addTo(layerGroup['Tàu quốc tế']);
                });
            }

            function getInternationShipPopup(shipLocation) {
                var htmlBuilder = '';

                htmlBuilder += '<div><strong>Tàu quốc tế</strong></div>';
               

                return htmlBuilder;
            }
        }

        function getOverlayShipLocationLayersForMonitor(leafletMap, ships) {
            var layerGroup = {
                'Tất cả': new L.LayerGroup().addTo(leafletMap)
            };

            setupShipLocationMarkers();

            return layerGroup;

            function setupShipLocationMarkers() {
                var customIcon = L.icon({
                    iconUrl: '../../assets/img/ship-marker/green.png',
                    iconSize: [15, 15]
                });

                var shipMarkers = getAllShipLocationMarkers();

                for (var i=0; i<ships.length; i++) {
                    var ship = ships[i];
                    var indentifyName = 'Mã tàu ' + ship.Id;

                    layerGroup[indentifyName] = new L.LayerGroup();
                    for (var j=0; j<shipMarkers[ship.Id].length; j++) {
                        var rotateMarker = shipMarkers[ship.Id][j];
                        rotateMarker.addTo(layerGroup[indentifyName]);
                        if (j === shipMarkers[ship.Id].length - 1) angular.copy(rotateMarker).addTo(layerGroup['Tất cả']);
                    }
                }

                function getAllShipLocationMarkers() {
                    var markers = {};

                    for (var i=0; i<ships.length; i++) {
                        var ship = ships[i];
                        markers[ship.Id] = [];

                        for (var j = 0; j < ship.ShipLocations.length; j++) {
                            var shipLocation = ship.ShipLocations[j];
                            var htmlPopup = getShipLocationPopup(ship, shipLocation);

                            markers[ship.Id].push(L.rotatedMarker([shipLocation.Latitude, shipLocation.Longitude], { icon: customIcon, angle: shipLocation.Angle }).bindPopup(htmlPopup));
                        }

                    }

                    return markers;
                }

            }

            function getShipLocationPopup(ship, location) {
                var htmlBuilder = '';

                switch (ship.ShipType) {
                    case settingConst.shipTypes.fishingShip.value:
                        ship.displayType = settingConst.shipTypes.fishingShip.name;
                        break;
                }

                htmlBuilder += '<div><strong>Mã tàu: </strong>' + ship.Id + '</div>';
                htmlBuilder += '<div><strong>Thuyền trưởng: </strong>' + ship.Caption + '</div>';
                htmlBuilder += '<div><strong>Loại tàu: </strong>' + ship.displayType + '</div>';
                htmlBuilder += '<div><strong>Vĩ độ: </strong>' + location.Latitude + '</div>';
                htmlBuilder += '<div><strong>Kinh độ: </strong>' + location.Longitude + '</div>';

                return htmlBuilder;
            }
        }


    }
})();