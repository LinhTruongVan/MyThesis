(function () {
    angular
        .module('app')
        .controller('pushDownCtrl', pushDownCtrl);

    pushDownCtrl.$inject = ['$scope', 'pushDownSvc'];

    function pushDownCtrl($scope, pushDownSvc) {
        $scope.close = close;

        function close() {
            pushDownSvc.hidePushDown();
        }

    }
})();