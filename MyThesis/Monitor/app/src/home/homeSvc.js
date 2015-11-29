(function () {
    'use strict';
    
    angular
        .module('app')
        .factory('homeSvc', homeSvc);

    homeSvc.$inject = ['settingConst'];

    function homeSvc(settingConst) {

        return {
            setupLastLocationForShips: setupLastLocationForShips
        };

        function setupLastLocationForShips(ships) {
            for (var m = 0; m < ships.length; m++) {
                var numberOfLocations = ships[m].locations.length;

                setupShipDisplayType(ships[m]);
                if (numberOfLocations.length <= 0) {
                    ships[m].latestLocation = {};
                    continue;
                }
                ships[m].latestLocation = ships[m].locations[numberOfLocations - 1];
            }

            function setupShipDisplayType(currentShip) {
                switch (currentShip.type) {
                    case settingConst.shipTypes.fishingShip.value:
                        currentShip.displayType = settingConst.shipTypes.fishingShip.name;
                        break;
                }
            }
        }


    }
})();