(function() {
    angular
        .module('app')
        .factory('homeDataSvc', homeDataSvc);

    homeDataSvc.$inject = ['host', '$http'];
    
    function homeDataSvc(host, $http) {
        return {
        };

    }

})();