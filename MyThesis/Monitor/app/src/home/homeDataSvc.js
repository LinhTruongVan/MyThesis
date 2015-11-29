(function() {
    angular
        .module('app')
        .factory('homeDataSvc', homeDataSvc);

    homeDataSvc.$inject = ['host', '$http'];
    
    function homeDataSvc(host, $http) {
        return {
            getAllShips: getAllShips
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
    }

})();