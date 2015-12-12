(function () {
    angular
        .module('app')
        .factory('commonDataSvc', commonDataSvc);

    commonDataSvc.$inject = ['host', '$http'];

    function commonDataSvc(host, $http) {
        return {
            getSummaryData: getSummaryData
        };

        function getSummaryData(user) {
            var req = {
                method: 'GET',
                url: host + '/users/' + user.Id + '/summary-data',
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http(req);
        }

    }
})();