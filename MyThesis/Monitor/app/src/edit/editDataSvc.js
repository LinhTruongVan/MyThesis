(function() {
    angular
        .module('app')
        .factory('editDataSvc', editDataSvc);

    editDataSvc.$inject = ['host', '$http'];
    
    function editDataSvc(host, $http) {
        return {
            updateShip: updateShip
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
    }

})();