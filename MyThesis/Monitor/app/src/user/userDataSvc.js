(function() {
    angular
        .module('app')
        .factory('userDataSvc', userDataSvc);

    userDataSvc.$inject = ['host', '$http'];
    
    function userDataSvc(host, $http) {
        return {
            signup: signup,
            login: login
        };

        function signup(newUser) {
            var req = {
                method: 'POST',
                url: host + '/users',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: newUser
            };
            return $http(req);
        }

        function login(user) {
            var req = {
                method: 'POST',
                url: host + '/users/authenticate',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: user
            };
            return $http(req);
        }

    }

})();