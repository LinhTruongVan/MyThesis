(function () {
    angular.module('app').factory('addStormDataSvc', addStormDataSvc);

    addStormDataSvc.$inject = ['host', '$http'];

    function addStormDataSvc(host, $http) {
        var service = {
            createStorm: createStorm
        };
        return service;

        function createStorm(storm) {
            var req = {
                method: 'POST',
                url: host + '/storms',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: storm
            };
            return $http(req);
        }

    }
})();