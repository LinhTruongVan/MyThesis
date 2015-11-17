(function() {
    angular
        .module('app')
        .factory('homeDataSvc', homeDataSvc);

    homeDataSvc.$inject = ['host', '$http'];
    
    function homeDataSvc(host, $http) {
        return {
            createShip: createShip,
            removeShip: removeShip,
            getAllShips: getAllShips,
            createWarningLocation: createWarningLocation
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

        function createWarningLocation(warningLocation){
            var req = {
                method: 'POST',
                url: host + '/warning-locations',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: warningLocation
            };
            return $http(req);
        }

    }

})();