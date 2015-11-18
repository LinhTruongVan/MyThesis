(function () {
    angular.module('app').factory('createWarningLocationDialogDataSvc', createWarningLocationDialogDataSvc);

    createWarningLocationDialogDataSvc.$inject = ['host', '$http'];

    function createWarningLocationDialogDataSvc(host, $http) {
        var service = {
            getWarningLocations: getWarningLocations,
            createWarningLocation: createWarningLocation
        };
        return service;

        function createWarningLocation(warningLocation) {
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

        function getWarningLocations() {
            var req = {
                method: 'GET',
                url: host + '/warning-locations',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

    }
})();