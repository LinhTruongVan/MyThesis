(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('shipCtrl', shipCtrl);

    shipCtrl.$inject = ['$scope', '$interval', 'spinnerUtilSvc', 'simulatorSettingDialogSvc', 'shipDataSvc',
        'latlongUtilSvc', 'homeSvc'];

    function shipCtrl($scope, $interval, spinnerUtilSvc, simulatorSettingDialogSvc, shipDataSvc,
        latlongUtilSvc, homeSvc) {
        var vm = this;

        vm.shipInfo = $scope.shipInfo;
        vm.shipIndex = $scope.shipIndex;
        vm.currentMovingAngle = 90;
        vm.settingTimeout = simulatorSettingDialogSvc.getSettingTimeout();

        vm.overlay = $scope.overlay;

        vm.sendLocation = sendLocation;
        vm.autoSendLocation = autoSendLocation;
        vm.removeShip = removeShip;

        init();

        function init() {
            setupShip();
            vm.autoSendLocationStatus = false;

            $scope.$watch('vm.settingTimeout.updateLocation', function() {
                autoUpdateLocation();
            });

            $scope.$watch('vm.settingTimeout.sendLocation', function () {
                autoSendLocation();
            });
        }

        function setupShip() {
            var numberOfShipLocation = vm.shipInfo.ShipLocations.length;
            if (numberOfShipLocation <= 0) return;
            vm.currentLocation = vm.shipInfo.ShipLocations[numberOfShipLocation - 1];

            autoUpdateLocation();
        }

        function removeShip() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.removeShip(vm.shipInfo.Id).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Xóa tàu thành công!');
                homeSvc.removeShip(vm.shipIndex);
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Xóa tàu không thành công!');
            });
        }

        function autoUpdateLocation() {
            if (vm.intervalForUpdatingLocation) $interval.cancel(vm.intervalForUpdatingLocation);

            vm.intervalForUpdatingLocation = $interval(function () {
                var newLocation = latlongUtilSvc.calculateNewLatlong(
                    parseFloat(vm.currentLocation.Latitude),
                    parseFloat(vm.currentLocation.Longitude),
                    vm.currentMovingAngle,
                    vm.shipInfo.Speed);
                vm.currentLocation.Latitude = newLocation.latitude;
                vm.currentLocation.Longitude = newLocation.longitude;
            }, vm.settingTimeout.updateLocation * 1000);
        }

        function autoSendLocation() {
            if (vm.intervalForSendingLocation) $interval.cancel(vm.intervalForSendingLocation);
            if (vm.autoSendLocationStatus === false) return;

            vm.intervalForSendingLocation = $interval(function () {
                sendLocationWithoutToastr();
            }, vm.settingTimeout.sendLocation * 1000);
        }

        function sendLocation() {
            var currentLocation = setCurrentLocationForCreating();

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.sendLocation(currentLocation).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Gửi tọa độ thành công!');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Gửi tọa độ không thành công!');
            });
        }

        function sendLocationWithoutToastr() {
            var currentLocation = setCurrentLocationForCreating();

            shipDataSvc.sendLocation(currentLocation).then(function () {
            }, function () {
            });
        }

        function setCurrentLocationForCreating() {
            return {
                $type: 'ShipLocation',
                Latitude: vm.currentLocation.Latitude,
                Longitude: vm.currentLocation.Longitude,
                CreatedAt: new Date(),
                ShipId: vm.shipInfo.Id,
                Angle: vm.currentMovingAngle
            }
        }


    }
    
})();