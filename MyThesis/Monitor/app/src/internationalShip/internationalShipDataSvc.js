(function () {
    angular
        .module('app')
        .factory('internationalShipDataSvc', internationalShipDataSvc);

    internationalShipDataSvc.$inject = ['host', '$http'];

    function internationalShipDataSvc(host, $http) {
        return {
            getShipLocations: getShipLocations
        };

        function getShipLocations() {
            return $http.get('../data.json');
        }

    }
})();