(function () {
    'use strict';

    angular
        .module('app')
        .controller('createShipDialogCtrl', createShipDialogCtrl);

    createShipDialogCtrl.$inject = ['$scope', 'settingConst', 'spinnerUtilSvc', 'latlongUtilSvc', 'overlay', 'createShipDialogSvc',
        'shipDataSvc', 'homeSvc', 'users'];

    function createShipDialogCtrl($scope, settingConst, spinnerUtilSvc, latlongUtilSvc, overlay, createShipDialogSvc,
        shipDataSvc, homeSvc, users) {

        $scope.newShip = {
            ShipStatus: settingConst.shipStatus.nornal.value
        };

        $scope.users = users;

        $scope.shipTypes = createShipDialogSvc.getShipTypes();

        $scope.closeDialog = closeDialog;
        $scope.createShip = createShip;

        function closeDialog() {
            $scope.$dismiss('cancel');
        }

        function createShip() {
            if (!createShipDialogSvc.validateShip($scope.newShip)) return;

            setupShipBeforeCreating($scope.newShip);
            var shipViewModel = buildCreateShipViewModel($scope.newShip);

            spinnerUtilSvc.showSpinner('spinnerSearch', overlay);
            shipDataSvc.createShip(shipViewModel).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.success('Thêm tàu thành công!');

                var createdShip = response.data.Ship;
                createdShip.ShipLocations = [response.data.ShipLocation];

                homeSvc.addShip(createdShip);
                closeDialog();
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.error('Thêm tàu không thành công!');
            });

        }

        function buildCreateShipViewModel(ship) {
            if (!ship.UserId || ship.UserId === '') ship.UserId = 1;
            var randomLatlong = latlongUtilSvc.getRandomLatlong();

            return {
                Ship: ship,
                ShipLocation: {
                    $type: 'ShipLocation',
                    Latitude: randomLatlong.latitude,
                    Longitude: randomLatlong.longitude,
                    CreatedAt: new Date(),
                    Description: '',
                    Angle: 90
                }
            }
        }

        function setupShipBeforeCreating(ship) {
            ship.ShipStatus = settingConst.shipStatus.nornal.value;
            ship.SailedAt = new Date();
        }

    }
})();