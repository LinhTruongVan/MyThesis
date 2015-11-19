(function () {
    'use strict';
    
    angular
        .module('app')
        .factory('homeSvc', homeSvc);

    homeSvc.$inject = [];

    function homeSvc() {

        var ships = [];

        return{
            setShips: setShips,
            getShips: getShips,
            addShip: addShip,
            removeShip: removeShip
        };

        function setShips(newShips){
            ships = newShips;
        }

        function getShips(){
            return ships;
        }

        function addShip(newShip){
            ships.push(newShip);
        }

        function removeShip(shipIndex){
            ships.splice(parseInt(shipIndex), 1);
        }

    }
})();