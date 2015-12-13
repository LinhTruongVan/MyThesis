(function() {
    angular
        .module('app')
        .factory('editDataSvc', editDataSvc);

    editDataSvc.$inject = ['host', '$http'];
    
    function editDataSvc(host, $http) {
        return {
            updateShip: updateShip,
            deleteShip: deleteShip
        };

        function updateShip(userId, ship) {
            var req = {
                method: 'PUT',
                url: host + '/users/' + userId + '/ships/' + ship.Id,
                headers: {
                    'Accept': 'application/json'
                },
                data: ship
            };
            return $http(req);
        }

        function deleteShip(shipId) {
            var req = {
                method: 'DELETE',
                url: host + '/ships/' + shipId,
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

    }
})();