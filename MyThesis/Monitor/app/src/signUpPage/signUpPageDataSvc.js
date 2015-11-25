(function() {
    angular
        .module('app')
        .factory('signUpPageDataSvc', signUpPageDataSvc);

    signUpPageDataSvc.$inject = ['host', '$http'];
    
    function signUpPageDataSvc(host, $http) {
        return {
        };

    }

})();