(function () {
    'use strict';

    angular
        .module('app')
        .controller('createShipDialogCtrl', createShipDialogCtrl);

    createShipDialogCtrl.$inject = ['$scope', 'settingConst', 'spinnerUtilSvc', 'latlongUtilSvc', 'overlay', 'createShipDialogSvc',
        'homeDataSvc'];

    function createShipDialogCtrl($scope, settingConst, spinnerUtilSvc, latlongUtilSvc, overlay, createShipDialogSvc,
        homeDataSvc) {

        $scope.newShip = {
            ShipStatus: settingConst.shipStatus.nornal.value
        };

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

            //spinnerUtilSvc.showSpinner('spinnerSearch', overlay);
            homeDataSvc.createShip(shipViewModel).then(function (response) {
                //spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.success('Create ship was successful!');

                //$scope.newShip._id = response.data.id;
                //$scope.newShip.locations = [{
                //    'latitude': $scope.newShip.latitude,
                //    'longitude': $scope.newShip.longitude,
                //    'direction': $scope.newShip.direction
                //}];

                //indexSvc.addShip($scope.newShip);
                closeDialog();
            }, function (error) {
                //spinnerUtilSvc.hideSpinner('spinnerSearch', overlay);
                toastr.error('Create ship was not successful!');
            });

        }

        function buildCreateShipViewModel(ship) {
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