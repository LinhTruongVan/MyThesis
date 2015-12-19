(function () {
    angular
        .module('app')
        .controller('addShipCtrl', addShipCtrl);

    addShipCtrl.$inject = ['$scope', 'pushDownSvc', 'createShipDialogSvc', 'spinnerUtilSvc', 'shipDataSvc', 'homeSvc',
        'settingConst', 'latlongUtilSvc'];

    function addShipCtrl($scope, pushDownSvc, createShipDialogSvc, spinnerUtilSvc, shipDataSvc, homeSvc,
        settingConst, latlongUtilSvc) {
        var vm = this;

        vm.newShip = {
            ShipStatus: settingConst.shipStatus.nornal.value
        };

        vm.users = $scope.users;
        vm.overlay = $scope.overlay;

        vm.shipTypes = createShipDialogSvc.getShipTypes();

        vm.close = close;
        vm.createShip = createShip;

        function createShip() {
            if (!createShipDialogSvc.validateShip(vm.newShip)) return;

            setupShipBeforeCreating(vm.newShip);
            var shipViewModel = buildCreateShipViewModel(vm.newShip);

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            shipDataSvc.createShip(shipViewModel).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Thêm tàu thành công!');

                var createdShip = response.data.Ship;
                createdShip.ShipLocations = [response.data.ShipLocation];

                homeSvc.addShip(createdShip);
                close();
            }, function () {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
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
                    Angle: 90,
                    ShipStatus: 'Normal'
                }
            }
        }

        function setupShipBeforeCreating(ship) {
            ship.ShipStatus = settingConst.shipStatus.nornal.value;
            ship.SailedAt = new Date();
        }

        function close() {
            pushDownSvc.hidePushDown();
        }

    }
})();