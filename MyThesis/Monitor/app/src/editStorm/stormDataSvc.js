(function() {
    angular
        .module('app')
        .factory('stormDataSvc', stormDataSvc);

    stormDataSvc.$inject = ['host', '$http'];
    
    function stormDataSvc(host, $http) {
        return {
            getStorms: getStorms,
            updateStorm: updateStorm,
            deleteStorm: deleteStorm,
            addStorm: addStorm
        };

        function getStorms() {
            var req = {
                method: 'GET',
                url: host + '/storms/',
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

        function updateStorm(storm) {
            var req = {
                method: 'PUT',
                url: host + '/storms/' + storm.Id,
                headers: {
                    'Accept': 'application/json'
                },
                data: storm
            };
            return $http(req);
        }

        function deleteStorm(stormId) {
            var req = {
                method: 'DELETE',
                url: host + '/storms/' + stormId,
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

        function addStorm(storm) {
            var req = {
                method: 'POST',
                url: host + '/storms/',
                headers: {
                    'Accept': 'application/json'
                },
                data: storm
            };
            return $http(req);
        }

    }
})();