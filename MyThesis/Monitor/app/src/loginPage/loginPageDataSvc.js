(function() {
    angular
        .module('app')
        .factory('loginPageDataSvc', loginPageDataSvc);

    loginPageDataSvc.$inject = ['host', '$http'];
    
    function loginPageDataSvc(host, $http) {
        return {
        };

    }

})();