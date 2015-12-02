(function() {
    angular
        .module('app')
        .factory('homeDataSvc', homeDataSvc);

    homeDataSvc.$inject = ['host', '$http'];
    
    function homeDataSvc(host, $http) {
        return {
            getAllShips: getAllShips,
            getAllWarningLocations: getAllWarningLocations
        };

        function getAllShips(user) {
            var req = {
                method: 'GET',
                url: host + '/users/' + user.Id + '/ships',
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

        function getAllWarningLocations() {
            var req = {
                method: 'GET',
                url: host + '/warning-locations',
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

    }
})();