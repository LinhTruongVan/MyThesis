(function() {
    angular
        .module('app')
        .factory('warningLocationDataSvc', warningLocationDataSvc);

    warningLocationDataSvc.$inject = ['host', '$http'];
    
    function warningLocationDataSvc(host, $http) {
        return {
        };

    }
})();