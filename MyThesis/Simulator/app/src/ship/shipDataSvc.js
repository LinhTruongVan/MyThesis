(function() {
    angular
        .module('app')
        .factory('shipDataSvc', shipDataSvc);

    shipDataSvc.$inject = ['host', '$http'];
    
    function shipDataSvc(host, $http) {
        return {
            createShip: createShip,
            removeShip: removeShip,
            getAllShips: getAllShips,
            sendLocation: sendLocation
        };

        function createShip(newShip){
            var req = {
                method: 'POST',
                url: host + '/ships',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: newShip
            };
            return $http(req);
        }

        function removeShip(id){
            var req = {
                method: 'DELETE',
                url: host + '/ships/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

        function getAllShips(){
            var req = {
                method: 'GET',
                url: host + '/ships',
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

        function sendLocation(shipLocation) {
            var req = {
                method: 'POST',
                url: host + '/ships/' + shipLocation.ShipId +'/locations',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: shipLocation
            };
            return $http(req);
        }

    }

})();