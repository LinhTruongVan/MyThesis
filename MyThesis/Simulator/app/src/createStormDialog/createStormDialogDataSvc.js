(function () {
    angular.module('app').factory('createStormDialogDataSvc', createStormDialogDataSvc);

    createStormDialogDataSvc.$inject = ['host', '$http'];

    function createStormDialogDataSvc(host, $http) {
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