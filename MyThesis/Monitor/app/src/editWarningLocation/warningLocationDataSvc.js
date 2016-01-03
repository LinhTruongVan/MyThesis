(function() {
    angular
        .module('app')
        .factory('warningLocationDataSvc', warningLocationDataSvc);

    warningLocationDataSvc.$inject = ['host', '$http'];
    
    function warningLocationDataSvc(host, $http) {
        return {
            getAllWarningLocations: getAllWarningLocations,
            addWarning: addWarning,
            editWarning: editWarning,
            deleteWarning: deleteWarning
        };

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

        function editWarning(warning) {
            var req = {
                method: 'PUT',
                url: host + '/warning-locations/' + warning.Id,
                headers: {
                    'Accept': 'application/json'
                },
                data: warning
            };
            return $http(req);
        }

        function addWarning(warning) {
            var req = {
                method: 'POST',
                url: host + '/warning-locations',
                headers: {
                    'Accept': 'application/json'
                },
                data: warning
            };
            return $http(req);
        }

        function deleteWarning(warningId) {
            var req = {
                method: 'DELETE',
                url: host + '/warning-locations/' + warningId,
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

    }
})();