(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('shipCtrl', shipCtrl);

    shipCtrl.$inject = ['$scope', '$interval', 'spinnerUtilSvc', 'simulatorSettingDialogSvc', 'shipDataSvc',
        'latlongUtilSvc', 'homeSvc', 'settingConst'];

    function shipCtrl($scope, $interval, spinnerUtilSvc, simulatorSettingDialogSvc, shipDataSvc,
        latlongUtilSvc, homeSvc, settingConst) {
        var vm = this;

        vm.shipInfo = $scope.shipInfo;
        vm.shipIndex = $scope.shipIndex;
        vm.currentMovingAngle = 90;
        vm.settingTimeout = simulatorSettingDialogSvc.getSettingTimeout();
        vm.isMoving = true;

        vm.overlay = $scope.overlay;

        vm.sendLocation = sendLocation;
        vm.autoSendLocation = autoSendLocation;
        vm.autoUpdateLocation = autoUpdateLocation;
        vm.sendSosMessage = sendSosMessage;
        vm.removeShip = removeShip;

        init();

        function init() {
            setupShip();
            vm.autoSendLocationStatus = true;

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

            if (vm.currentLocation.ShipStatus !== settingConst.shipStatus.nornal.value) vm.isMoving = false;
            autoUpdateLocation();
        }

        function removeShip() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.removeShip(vm.shipInfo.Id).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Xóa tàu thành công!');
                homeSvc.removeShip(vm.shipInfo.Id);
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Xóa tàu không thành công!');
            });
        }

        function autoUpdateLocation() {
            if (vm.intervalForUpdatingLocation) $interval.cancel(vm.intervalForUpdatingLocation);
            if (!vm.isMoving) return;

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

        function sendSosMessage() {
            var currentLocation = setupCurrentLocationForSos();
            vm.isMoving = false;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.sendLocation(currentLocation).then(function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Gửi tín hiệu cần giúp đỡ thành công!');
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.error('Gửi tín hiệu cần giúp đỡ không thành công!');
            });
        }

        function sendLocationWithoutToastr() {
            var currentLocation = setCurrentLocationForCreating();

            shipDataSvc.sendLocation(currentLocation).then(function () {
            });
        }

        function setCurrentLocationForCreating() {
            return {
                $type: 'ShipLocation',
                Latitude: vm.currentLocation.Latitude,
                Longitude: vm.currentLocation.Longitude,
                CreatedAt: new Date(),
                ShipId: vm.shipInfo.Id,
                Angle: vm.currentMovingAngle,
                ShipStatus: 'Normal'
            }
        }

        function setupCurrentLocationForSos() {
            return {
                $type: 'ShipLocation',
                Latitude: vm.currentLocation.Latitude,
                Longitude: vm.currentLocation.Longitude,
                CreatedAt: new Date(),
                ShipId: vm.shipInfo.Id,
                Angle: vm.currentMovingAngle,
                ShipStatus: 'Malfunction'
            }
        }


    }
    
})();