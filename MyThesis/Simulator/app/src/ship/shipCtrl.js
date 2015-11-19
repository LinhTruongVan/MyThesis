(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('shipCtrl', shipCtrl);

    shipCtrl.$inject = ['$scope', '$interval', 'spinnerUtilSvc'];

    function shipCtrl($scope, $interval, spinnerUtilSvc) {
        var vm = this;

        vm.shipInfo = $scope.shipInfo;
        vm.currentMovingAngle = 90;

        function init() {
            setupShip();
            vm.autoSendLocationStatus = false;
        }

        function setupShip() {
            var numberOfShipLocation = vm.shipInfo.ShipLocations.length;
            if (numberOfShipLocation <= 0) return;

            vm.currentLocation = vm.shipInfo.ShipLocations[numberOfShipLocation - 1];
        }

    }
    
})();